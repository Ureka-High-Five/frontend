import axios from "axios";

interface FileUploadProps {
  presignedUrl: string;
  file: File;
}

const putFileUpload = async ({ presignedUrl, file }: FileUploadProps) => {
  const response = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return response.data.content;
};

export default putFileUpload;
