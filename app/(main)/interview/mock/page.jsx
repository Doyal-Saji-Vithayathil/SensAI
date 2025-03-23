import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const MockInterviewPage = () => {
  return (
    <div>
      <div className="flex flex-col space-y-2 mx-2">
        <Link href={"/interview"}>
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;
