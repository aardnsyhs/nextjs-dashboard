import { poppins } from "@/app/ui/fonts";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return <p className="p-6 text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="w-full">
      <h1 className={`${poppins.className} text-2xl font-semibold mb-4`}>
        Your Profile
      </h1>
      <div className="rounded-lg bg-white p-6 shadow-sm space-y-4 text-gray-700">
        <div>
          <span className="font-medium">Name:</span> {session.user.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {session.user.email}
        </div>
      </div>
    </div>
  );
}
