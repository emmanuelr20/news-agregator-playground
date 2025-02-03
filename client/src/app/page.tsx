import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Welcome to News Aggregator</CardTitle>
            <CardDescription>
              Get up to date and personalized news streams from multiple sources
            </CardDescription>
          </CardHeader>
          <CardContent>Authenticate to continue</CardContent>
          <CardFooter className="flex gap-2">
            <a href="/login">
              <Button className="w-20">Login</Button>
            </a>
            <a href="/sign-up">
              <Button className="w-20" variant="outline">
                Sign Up
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
