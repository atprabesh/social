import CreatePost from "@components/UI/CreatePost";
import CardMedia from "@components/UI/PostCard";
import { Button, Loader, Paper, SimpleGrid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { onValue, ref } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../App";
import { fireStoreApp, realTime } from "../init-firebase";
import { IPostResponse } from "../types";

const Home = () => {
  const db = realTime(firebaseConfig);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postList, setPostList] = useState<IPostResponse[] | null>([]);
  const postRef = collection(fireStoreApp(firebaseConfig), "posts");

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setPostList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((e: any) => {
          //@ts-ignore
          setPostList((prev) => [...prev, e]);
        });
      }
    });
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
      const { docs } = await getDocs(postRef);
      setPostList(
        docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPostResponse[]
      );
    } catch (error) {
      showNotification({ message: "Error" });
    }
    setLoading(false);
  };

  return (
    <div>
      {!showAdd && <Button onClick={() => setShowAdd(true)}>Share Post</Button>}
      {showAdd && (
        <Paper mt={10} p={20}>
          <CreatePost setShowAdd={setShowAdd} />
        </Paper>
      )}

      <SimpleGrid cols={3} mt={10}>
        {!loading &&
          postList &&
          postList.map((e) => (
            <CardMedia
              key={e.id}
              id={e.id}
              comments={e.comments ?? []}
              description={e.description}
              imageUrl={e.imageUrl}
              likes={e.likes ?? []}
              title={e.title}
              username={e.username}
            />
          ))}
      </SimpleGrid>

      {loading && <Loader />}
    </div>
  );
};

export default Home;
