import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { QrCode, ScanLine, CheckCircle2, CameraOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout, PageHeader } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { attendanceApi } from "@/services/api";

export const Route = createFileRoute("/organizer/scanner")({
  component: () => (
    <ProtectedRoute roles={["organizer", "admin"]}>
      <DashboardLayout><Scanner /></DashboardLayout>
    </ProtectedRoute>
  ),
});

interface ScanEntry {
  id: string;
  code: string;
  name: string;
  time: string;
  status: "success" | "duplicate" | "error";
}

const SCANNER_ID = "qr-scanner-region";

function parseTicket(raw: string): {
  registrationId: string;
  name: string;
} {

  try {

    const parsed =
      JSON.parse(raw);

    return {

      registrationId:
        parsed.registrationId,

      name:
        parsed.name ||
        "Participant",
    };

  } catch {

    return {
      registrationId: raw,
      name: "Participant",
    };
  }
}

function Scanner() {
  const [scans, setScans] = useState<ScanEntry[]>([]);
  const [code, setCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [activeCam, setActiveCam] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const seenRef = useRef<Set<string>>(new Set());
  const lastScanAtRef = useRef<number>(0);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devs) => {
        setCameras(devs);
        const back = devs.find((d) => /back|rear|environment/i.test(d.label));
        setActiveCam((back || devs[0])?.id ?? null);
      })
      .catch(() => {/* permission not yet granted; will prompt on start */});
    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecoded = async (raw: string) => {
    // Debounce duplicate fires from the decoder
    const now = Date.now();
    if (now - lastScanAtRef.current < 1200) return;
    lastScanAtRef.current = now;

    // const { code: ticket, name } = parseTicket(raw.trim());
    const {
  registrationId,
  name,
} = parseTicket(raw.trim());


    if (!registrationId) return;

    if (seenRef.current.has(registrationId)) {
      setScans((s) => [{ id: crypto.randomUUID(), code: registrationId, name, time: new Date().toLocaleTimeString(), status: "duplicate" }, ...s]);
      toast.warning(`Already checked in: ${name}`);
      return;
    }
    seenRef.current.add(registrationId);

    // Optimistic UI + best-effort API call
    const entry: ScanEntry = { id: crypto.randomUUID(), code: registrationId, name, time: new Date().toLocaleTimeString(), status: "success" };
    setScans((s) => [entry, ...s]);
    toast.success(`✓ ${name} checked in`);

    try {
      await attendanceApi.mark({ registrationId });
    } catch {
      // Backend may not be wired in demo mode — keep local record
    }
  };

  const startScanner = async () => {
    setError(null);
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(SCANNER_ID, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
      }
      const camId = activeCam || (await Html5Qrcode.getCameras())[0]?.id;
      if (!camId) {
        setError("No camera detected on this device.");
        return;
      }
      await scannerRef.current.start(
        { deviceId: { exact: camId } },
        { fps: 10, qrbox: { width: 240, height: 240 }, aspectRatio: 1 },
        (decodedText) => { void handleDecoded(decodedText); },
        () => {/* per-frame decode failure: ignore */}
      );
      setScanning(true);
    } catch (e: any) {
      const msg = e?.message || String(e);
      setError(msg.includes("Permission") || msg.includes("NotAllowed")
        ? "Camera permission denied. Please allow camera access in your browser."
        : `Could not start camera: ${msg}`);
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current && scannerRef.current.isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
    } catch {/* noop */}
    setScanning(false);
  };

  const switchCamera = async (id: string) => {
    setActiveCam(id);
    if (scanning) {
      await stopScanner();
      // brief tick so the DOM region resets
      setTimeout(startScanner, 100);
    }
  };

  const manualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    void handleDecoded(code.trim());
    setCode("");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="QR Attendance Scanner" description="Point your camera at a participant's QR ticket to mark attendance instantly." />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card border-border/60">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 border border-border">
            <div id={SCANNER_ID} className="absolute inset-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover" />
            {!scanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-3 bg-muted/40 backdrop-blur-sm">
                <QrCode className="h-16 w-16 opacity-40" />
                <div className="text-center">
                  <div className="font-medium">Camera is off</div>
                  <div className="text-xs mt-1">Click "Start camera" to begin scanning</div>
                </div>
              </div>
            )}
            {scanning && (
              <>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative h-60 w-60 rounded-xl border-2 border-primary/70 shadow-glow">
                    <span className="absolute -top-1 -left-1 h-5 w-5 border-t-2 border-l-2 border-primary rounded-tl-md" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 border-t-2 border-r-2 border-primary rounded-tr-md" />
                    <span className="absolute -bottom-1 -left-1 h-5 w-5 border-b-2 border-l-2 border-primary rounded-bl-md" />
                    <span className="absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-primary rounded-br-md" />
                    <div className="absolute inset-x-0 top-1/2 h-0.5 gradient-primary opacity-80 animate-pulse" />
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-success/15 text-success border-success/30 border">● Live</Badge>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-5">
            {!scanning ? (
              <Button onClick={startScanner} className="gradient-primary text-primary-foreground border-0">
                <ScanLine className="h-4 w-4 mr-2" />Start camera
              </Button>
            ) : (
              <Button onClick={stopScanner} variant="destructive">
                <CameraOff className="h-4 w-4 mr-2" />Stop
              </Button>
            )}
            <select
              value={activeCam ?? ""}
              onChange={(e) => switchCamera(e.target.value)}
              disabled={cameras.length === 0}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {cameras.length === 0 && <option value="">No cameras found</option>}
              {cameras.map((c) => (
                <option key={c.id} value={c.id}>{c.label || `Camera ${c.id.slice(0, 6)}`}</option>
              ))}
            </select>
          </div>

          <form onSubmit={manualSubmit} className="mt-5 space-y-2">
            <Label className="text-xs">Manual ticket entry</Label>
            <div className="flex gap-2">
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="TKT-XXXX-XXXX" />
              <Button type="submit" variant="secondary">Verify</Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 shadow-card border-border/60">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" />Recent check-ins</h3>
            <Badge variant="outline">{scans.filter(s => s.status === "success").length} marked</Badge>
          </div>
          <div className="mt-4 divide-y divide-border max-h-[480px] overflow-y-auto">
            {scans.length === 0 && <div className="text-center py-12 text-sm text-muted-foreground">No scans yet. Start the camera and aim at a QR code →</div>}
            {scans.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full grid place-items-center ${s.status === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {s.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{s.code.slice(0, 24)}{s.code.length > 24 ? "…" : ""}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                  {s.status === "duplicate" && <div className="text-[10px] text-warning uppercase tracking-wide">duplicate</div>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
