import { createFileRoute } from "@tanstack/react-router";

import {
  useState,
} from "react";

import { toast } from "sonner";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  useAuth,
} from "@/context/AuthContext";

import { authApi } from "@/services/api";


export const Route =
  createFileRoute("/profile")({
    component: () => (
      <ProtectedRoute>
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


function Profile() {

  const {
    user,
    setUser,
  } = useAuth();

  if (!user) return null;


  const initials =
    user.name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("");


  const [name, setName] =
    useState(user.name);

  const [email, setEmail] =
    useState(user.email);

  const [loading, setLoading] =
    useState(false);


  const [pw, setPw] =
    useState({
      current: "",
      next: "",
      confirm: "",
    });


  // UPDATE PROFILE
  const saveInfo =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await authApi.updateProfile({

            name,
            email,
          });


        setUser(
          res.data.user
        );

        localStorage.setItem(
          "user",

          JSON.stringify(
            res.data.user
          )
        );


        toast.success(
          "Profile updated"
        );

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||

          "Failed to update profile"
        );

      } finally {

        setLoading(false);
      }
    };


  // CHANGE PASSWORD
  const changePw =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        pw.next.length < 6
      ) {

        return toast.error(
          "Password must be at least 6 characters"
        );
      }

      if (
        pw.next !==
        pw.confirm
      ) {

        return toast.error(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        console.log("res");
        await authApi.changePassword({
          oldPassword:
            pw.current,

          newPassword:
            pw.next,
        });

        toast.success(
          "Password changed successfully"
        );

        setPw({
          current: "",
          next: "",
          confirm: "",
        });

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||

          "Failed to change password"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="space-y-6">

      <PageHeader
        title="My profile"

        description="Manage your account details."
      />


      {/* PROFILE CARD */}
      <Card className="p-6 shadow-card border-border/60">

        <div className="flex items-center gap-5">

          <Avatar className="h-20 w-20">

            <AvatarFallback className="gradient-primary text-primary-foreground text-2xl font-bold">

              {initials}

            </AvatarFallback>
          </Avatar>


          <div className="flex-1 min-w-0">

            <h2 className="text-xl font-bold">

              {user.name}

            </h2>


            <p className="text-muted-foreground text-sm">

              {user.email}

            </p>


            <Badge className="mt-2 gradient-primary text-primary-foreground border-0 capitalize">

              {user.role}

            </Badge>
          </div>
        </div>
      </Card>


      {/* TABS */}
      <Tabs defaultValue="info">

        <TabsList>

          <TabsTrigger value="info">

            Information

          </TabsTrigger>


          <TabsTrigger value="password">

            Password

          </TabsTrigger>

        </TabsList>


        {/* INFO */}
        <TabsContent value="info">

          <Card className="p-6 shadow-card border-border/60">

            <form
              onSubmit={saveInfo}

              className="space-y-4 max-w-md"
            >

              <div className="space-y-1.5">

                <Label>
                  Full name
                </Label>

                <Input
                  value={name}

                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="space-y-1.5">

                <Label>
                  Email
                </Label>

                <Input
                  type="email"

                  value={email}

                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>


              <Button
                type="submit"

                disabled={loading}

                className="gradient-primary text-primary-foreground border-0"
              >

                Save changes

              </Button>
            </form>
          </Card>
        </TabsContent>


        {/* PASSWORD */}
        <TabsContent value="password">

          <Card className="p-6 shadow-card border-border/60">

            <form
              onSubmit={changePw}

              className="space-y-4 max-w-md"
            >

              <div className="space-y-1.5">

                <Label>
                  Current password
                </Label>

                <Input
                  type="password"

                  value={pw.current}

                  onChange={(e) =>
                    setPw({
                      ...pw,
                      current:
                        e.target
                          .value,
                    })
                  }
                />
              </div>


              <div className="space-y-1.5">

                <Label>
                  New password
                </Label>

                <Input
                  type="password"

                  value={pw.next}

                  onChange={(e) =>
                    setPw({
                      ...pw,
                      next:
                        e.target
                          .value,
                    })
                  }
                />
              </div>


              <div className="space-y-1.5">

                <Label>
                  Confirm new password
                </Label>

                <Input
                  type="password"

                  value={pw.confirm}

                  onChange={(e) =>
                    setPw({
                      ...pw,
                      confirm:
                        e.target
                          .value,
                    })
                  }
                />
              </div>


              <Button
                type="submit"

                disabled={loading}

                className="gradient-primary text-primary-foreground border-0"
              >

                Change password

              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}