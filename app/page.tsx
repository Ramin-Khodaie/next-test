"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File | null>(null);

  const handleClick = async () => {
    console.log("🚀 ~ file: index.tsx:9 ~ TestPage ~ files:", files);
    if (!files) {
      return;
    }
    const formData = new FormData();
    formData.append("images", files, files.name);
    formData.append(
      "rois",
      JSON.stringify([
        {
          snapshot_id: files.name.split(".")[0],
          shape: "NONE",
        },
      ])
    );
    const res = await axios
      .post(
        `/api/snapshot-archives/d19184a4-43b1-4258-9df1-a6f1541869f9/snapshots/batch-create?is_using_hemocytometer=false`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            "X-Auth-Token": "3036f2a0-7414-45c8-a320-e6356bf8334e",            
            "X-Platform": "web",
            "X-Timezone": "Asia/Tehran",
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });

    console.log({ res });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      <input
        multiple
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            const newFile = new File([e.target.files[0]], `dummyName.png`, {
              type: e.target.files[0].type,
            });

            setFiles(newFile);
          }
        }}
      />
      <button className="w-24" onClick={handleClick}>
        <span>Upoad</span>
      </button>
    </main>
  );
}
