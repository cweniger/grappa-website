import React from "react";
import Image from "next/image";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";

export function PageMetadata() {
  return (
    <>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
    </>
  );
}
