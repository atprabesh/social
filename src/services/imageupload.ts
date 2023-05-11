import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../App";
import { storage } from "../init-firebase";

const str = storage(firebaseConfig);
function PostImageUpload(props: {
  onSuccess: (e: string) => void;
  f: File[];
  setFile: any;
  setLoading: any;
}) {
  props.setLoading(true);
  props.setFile(props.f[0]);
  const file = props.f[0];
  if (!file) return;

  const storageRef = ref(str, `images/${file.name}+${file.lastModified}`);
  uploadBytes(storageRef, file)
    .then((e) => getDownloadURL(e.ref).then((e) => props.onSuccess(e)))
    .catch((err) => alert(err))
    .finally(() => props.setLoading(false));
}

function UploadProfile(file: File, userId: string) {
  const storageRef = ref(str, `profile/${userId}`);
  return uploadBytes(storageRef, file)
    .then((e) => getDownloadURL(e.ref).then((e) => e ?? ""))
    .catch((err) => alert(err));
}

export { PostImageUpload, UploadProfile };
