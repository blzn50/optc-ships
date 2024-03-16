import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { searchVal } from "@/searchStore";
import { Button } from "./ui/button";

export function Search({ debounce = 500 }: { debounce?: number }) {
  const $searchVal = useStore(searchVal);
  const [val, setVal] = useState($searchVal);

  useEffect(() => {
    setVal($searchVal);
  }, [$searchVal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchVal.set(val);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [val]);

  return (
    <div className="relative flex w-full max-w-screen-lg">
      <Input
        className="w-full mx-2"
        type="text"
        placeholder="Filter ships..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      {!!val && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-3 top-0.5 opacity-70 hover:bg-transparent focus:outline-none hover:opacity-100"
          onClick={() => searchVal.set("")}
        >
          <X className="absolute h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
