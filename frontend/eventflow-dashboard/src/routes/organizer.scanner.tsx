import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

import {
  QrCode,
  ScanLine,
  CheckCircle2,
  CameraOff,
  AlertCircle,
} from "lucide-react";

import { toast } from "sonner";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

import { attendanceApi } from "@/services/api";

export const Route =
  createFileRoute(
    "/organizer/scanner"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "organizer",
          "admin",
        ]}
      >
        <DashboardLayout>
          <Scanner />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });

interface ScanEntry {
  id: string;
  code: string;
  name: string;
  time: string;
  status:
    | "success"
    | "duplicate"
    | "error";
}

const SCANNER_ID =
  "qr-scanner-region";

function parseTicket(
  raw: string
): {
  ticketId?: string;
  registrationId?: string;
  name: string;
} {

  try {

    const parsed =
      JSON.parse(raw);

    return {

      ticketId:
        parsed.ticketId,

      registrationId:
        parsed.registrationId,

      name:
        parsed.name ||
        "Participant",
    };

  } catch {

    return {

      ticketId:
        raw.trim(),

      name:
        "Participant",
    };
  }
}

function Scanner() {

  const [scans, setScans] =
    useState<ScanEntry[]>(
      []
    );

  const [code, setCode] =
    useState("");

  const [
    scanning,
    setScanning,
  ] = useState(false);

  const [error, setError] =
    useState<string | null>(
      null
    );

  const [
    cameras,
    setCameras,
  ] = useState<
    {
      id: string;
      label: string;
    }[]
  >([]);

  const [
    activeCam,
    setActiveCam,
  ] = useState<
    string | null
  >(null);

  const scannerRef =
    useRef<Html5Qrcode | null>(
      null
    );

  const seenRef =
    useRef<Set<string>>(
      new Set()
    );

  const lastScanAtRef =
    useRef<number>(0);

  useEffect(() => {

    Html5Qrcode
      .getCameras()

      .then((devs) => {

        setCameras(devs);

        const back =
          devs.find((d) =>
            /back|rear|environment/i.test(
              d.label
            )
          );

        setActiveCam(
          (
            back ||
            devs[0]
          )?.id ?? null
        );
      })

      .catch(() => {});

    return () => {
      stopScanner();
    };

  }, []);

  const handleDecoded =
    async (
      raw: string
    ) => {

      const now =
        Date.now();

      if (
        now -
          lastScanAtRef.current <
        1200
      ) {
        return;
      }

      lastScanAtRef.current =
        now;

      console.log(
        "QR RAW:",
        raw
      );

      const {
        registrationId,
        ticketId,
        name,
      } = parseTicket(
        raw.trim()
      );

      const scanCode =
        ticketId ||
        registrationId;

      if (!scanCode) {
        console.log(
          "No scan code found"
        );
        return;
      }

      console.log(
        "Parsed:",
        {
          registrationId,
          ticketId,
          scanCode,
        }
      );

      if (
        seenRef.current.has(
          scanCode
        )
      ) {

        setScans((s) => [
          {
            id:
              Date.now().toString(),

            code:
              scanCode,

            name,

            time:
              new Date().toLocaleTimeString(),

            status:
              "duplicate",
          },

          ...s,
        ]);

        toast.warning(
          `Already checked in: ${name}`
        );

        return;
      }

      seenRef.current.add(
        scanCode
      );

      const entry: ScanEntry =
        {
          id:
            Date.now().toString(),

          code:
            scanCode,

          name,

          time:
            new Date().toLocaleTimeString(),

          status:
            "success",
        };

      setScans((s) => [
        entry,
        ...s,
      ]);

      toast.success(
        `✓ ${name} checked in`
      );

      try {

        // ticket verification
        if (ticketId) {

          await attendanceApi.mark(
            {
              ticketId,
            }
          );
        }

        // registration verification
        else if (
          registrationId
        ) {

          await attendanceApi.mark(
            {
              registrationId,
            }
          );
        }

        console.log(
          "Attendance marked"
        );

      } catch (e) {

        console.log(
          "Attendance error",
          e
        );

        toast.error(
          "Failed to mark attendance"
        );
      }
    };

  const startScanner =
    async () => {

      setError(null);

      try {

        if (
          !scannerRef.current
        ) {

          scannerRef.current =
            new Html5Qrcode(
              SCANNER_ID,
              {
                formatsToSupport:
                  [
                    Html5QrcodeSupportedFormats.QR_CODE,
                  ],

                verbose:
                  false,
              }
            );
        }

        const devices =
          await Html5Qrcode.getCameras();

        if (
          devices.length === 0
        ) {

          setError(
            "No cameras found"
          );

          return;
        }

        const camId =
          activeCam ||
          devices[0].id;

        await scannerRef.current.start(
          {
            deviceId: {
              exact:
                camId,
            },
          },

          {
            fps: 10,

            qrbox: {
              width: 240,
              height: 240,
            },

            aspectRatio: 1,
          },

          (
            decodedText
          ) => {

            void handleDecoded(
              decodedText
            );
          },

          () => {}
        );

        setScanning(true);

      } catch (e: any) {

        console.log(e);

        setError(
          e?.message ||
            "Failed to start scanner"
        );

        setScanning(false);
      }
    };

  const stopScanner =
    async () => {

      try {

        if (
          scannerRef.current
        ) {

          await scannerRef.current.stop();

          await scannerRef.current.clear();
        }

      } catch (e) {

        console.log(e);
      }

      setScanning(false);
    };

  const switchCamera =
    async (
      id: string
    ) => {

      setActiveCam(id);

      if (scanning) {

        await stopScanner();

        setTimeout(
          async () => {
            await startScanner();
          },
          300
        );
      }
    };

  const manualSubmit =
    (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (!code.trim()) {
        return;
      }

      void handleDecoded(
        code.trim()
      );

      setCode("");
    };

  return (

    <div className="space-y-6">

      <PageHeader
        title="QR Attendance Scanner"
        description="Scan participant tickets"
      />

      <div className="grid lg:grid-cols-2 gap-6">

        <Card className="p-6">

          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 border">

            <div
              id={SCANNER_ID}
              className="absolute inset-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
            />

            {!scanning && (

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">

                <QrCode className="h-16 w-16 opacity-40" />

                <div className="text-center">

                  <div className="font-medium">
                    Camera is off
                  </div>

                </div>

              </div>
            )}
          </div>

          {error && (

            <div className="mt-4 flex items-center gap-2 text-red-500">

              <AlertCircle className="h-4 w-4" />

              {error}

            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-5">

            {!scanning ? (

              <Button
                onClick={
                  startScanner
                }
              >

                <ScanLine className="h-4 w-4 mr-2" />

                Start Camera

              </Button>

            ) : (

              <Button
                variant="destructive"
                onClick={
                  stopScanner
                }
              >

                <CameraOff className="h-4 w-4 mr-2" />

                Stop

              </Button>
            )}

            <select
              value={
                activeCam ??
                ""
              }

              onChange={(e) =>
                switchCamera(
                  e.target.value
                )
              }

              className="rounded-md border px-3 py-2"
            >

              {cameras.map(
                (c) => (

                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.label}
                  </option>
                )
              )}
            </select>
          </div>

          <form
            onSubmit={
              manualSubmit
            }

            className="mt-5 space-y-2"
          >

            <Label>
              Manual ticket entry
            </Label>

            <div className="flex gap-2">

              <Input
                value={code}

                onChange={(e) =>
                  setCode(
                    e.target.value
                  )
                }

                placeholder="TKT-XXXX"
              />

              <Button type="submit">
                Verify
              </Button>

            </div>
          </form>
        </Card>

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold flex items-center gap-2">

              <CheckCircle2 className="h-5 w-5 text-green-500" />

              Recent check-ins

            </h3>

            <Badge variant="outline">

              {
                scans.filter(
                  (s) =>
                    s.status ===
                    "success"
                ).length
              } marked

            </Badge>
          </div>

          <div className="mt-4 divide-y max-h-[480px] overflow-y-auto">

            {scans.length ===
              0 && (

              <div className="text-center py-12 text-sm text-muted-foreground">

                No scans yet

              </div>
            )}

            {scans.map((s) => (

              <div
                key={s.id}
                className="flex items-center justify-between py-3"
              >

                <div>

                  <div className="font-medium text-sm">
                    {s.name}
                  </div>

                  <div className="text-xs font-mono">
                    {s.code}
                  </div>

                </div>

                <div className="text-xs text-muted-foreground">
                  {s.time}
                </div>

              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}