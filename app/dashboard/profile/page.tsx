import { poppins } from "@/app/ui/fonts";
import { auth } from "@/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>
          You are not logged in. Please sign in to view your profile.
        </AlertDescription>
      </Alert>
    );
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : session.user.email?.[0].toUpperCase() ?? "U";

  return (
    <div className="w-full">
      <h1 className={`${poppins.className} text-2xl font-semibold mb-6`}>
        Profile
      </h1>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {session.user.name || "User"}
              </CardTitle>
              <Badge variant="outline" className="mt-1">
                Member
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Personal Information</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {session.user.name || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
