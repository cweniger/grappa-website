import React from "react";
import dynamic from "next/dynamic";

const AdminWithNoSSR = dynamic(
() =>
    import("netlify-cms-app").then((CMS: any) => {
      CMS.init();
    }) as any,
  { ssr: false });

export default AdminWithNoSSR;