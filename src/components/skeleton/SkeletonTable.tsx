import React from "react";
import { Skeleton } from "@mantine/core";

const SkeletonTable: React.FC = () => {
  return (
    <div style={{ padding: "4px" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
        <>
          <Skeleton height={8} radius="xl" mt="md" />
        </>
      ))}
    </div>
  );
};

export default SkeletonTable;
