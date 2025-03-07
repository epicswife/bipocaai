"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileDown, AlertTriangle } from "lucide-react";

export function LessonImporter() {
  const [isImporting, setIsImporting] = useState(false);
  const [importUrl, setImportUrl] = useState("");

  const handleImport = () => {
    setIsImporting(true);
    // Import logic here
    setIsImporting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Lesson</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter URL to import lesson"
          value={importUrl}
          onChange={(e) => setImportUrl(e.target.value)}
        />
        <Button className="mt-4" onClick={handleImport} disabled={isImporting}>
          {isImporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4 mr-2" />
          )}
          Import Lesson
        </Button>
        <Alert className="mt-4">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Ensure the URL is correct and the lesson format is supported.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
