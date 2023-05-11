import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";

import { useState } from "react";
import { PostImageUpload } from "@services/imageupload";
import { Loader } from "@mantine/core";

function ImageUpload(
  props: Partial<DropzoneProps> & { onSuccess: (e: string) => void }
) {
  const [file, setFile] = useState<FileWithPath>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dropzone
      loading={loading}
      onDrop={async (e) => {
        await PostImageUpload({
          f: e,
          onSuccess: props.onSuccess,
          setFile,
          setLoading,
        });
      }}
      onReject={() => alert("rejected")}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      {...props}
    >
      {loading ? (
        <Loader />
      ) : (
        <>{file ? file.name : "Upload your image here!"}</>
      )}
    </Dropzone>
  );
}

export default ImageUpload;
