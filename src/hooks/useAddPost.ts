import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { ref, set } from "firebase/database";
import { collection } from "firebase/firestore";
import { uid } from "uid";
import { firebaseConfig } from "../App";
import { fireStoreApp, realTime } from "../init-firebase";
import { useAuth } from "./useAuth";

interface AddPostFormValues {
  title: string;
  description: string;
  imageUrl: string;
  comments?: { userId: string; username: string; content: string }[];
  likes?: string[];
}

const useAddPost = () => {
  const db = fireStoreApp(firebaseConfig);
  const realtime = realTime(firebaseConfig);

  const auth = useAuth();
  const form = useForm<AddPostFormValues>({
    initialValues: {
      title: "",
      description: "",
      imageUrl: "",
      comments: [],
      likes: [],
    },
    validate: {
      title: (value) => {
        if (!value) return "Title is required";
        return null;
      },
    },
  });

  const postFromFirestore = collection(db, "posts");

  const handleAddPost = async (data: typeof form.values) => {
    const uuid = uid();

    try {
      await set(ref(realtime, `/${uuid}`), {
        ...data,
        userId: auth?.user?.uid,
        username: auth?.user?.displayName,
        id: uuid,
        likes: [auth?.user?.uid],
        comments: [{ username: "Admin", content: "Please be civilized!" }],
      });

      showNotification({
        message: "Success",
      });
    } catch (error: any) {
      showNotification({
        color: "red",
        message: error?.message,
      });
    }
  };

  return {
    form,
    handleAddPost,
  };
};

export default useAddPost;
