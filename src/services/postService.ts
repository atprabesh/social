import { showNotification } from "@mantine/notifications";
import { ref, update } from "firebase/database";
import { firebaseConfig } from "../App";
import { realTime } from "../init-firebase";

const db = realTime(firebaseConfig);

const handleLike = async ({
  likes,
  uid,
  id,
}: {
  likes: string[];
  uid: string;
  id: string;
}) => {
  const likeList = [...likes];

  if (likeList.includes(uid)) {
    likeList.splice(likeList.indexOf(uid), 1);
  } else {
    likeList.push(uid);
  }

  try {
    await update(ref(db, `/${id}`), {
      likes: likeList,
    });
  } catch (error) {
    showNotification({
      message: "Something went wrong!",
      color: "red",
      title: "Error!",
    });
  }
};

const handleComment = async ({
  content,
  comments,
  id,
  username,
}: {
  username: string;
  content: string;
  comments: [];
  id: string;
}) => {
  try {
    await update(ref(db, `/${id}`), {
      comments: [...(comments as []), { username, content }],
    });
  } catch (error) {
    showNotification({
      message: "Something went wrong!",
      color: "red",
      title: "Error!",
    });
  }
};

export { handleLike, handleComment };
