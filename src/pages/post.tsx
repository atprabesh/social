import {
  Avatar,
  Button,
  Chip,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  TextInput,
  TypographyStylesProvider,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { handleComment, handleLike } from "@services/postService";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { firebaseConfig } from "../App";
import { realTime } from "../init-firebase";
import { IPostResponse } from "../types";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    marginTop: "10px",
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  body: string;
  name: string;
}

function CommentHtml({ body, name }: CommentHtmlProps) {
  const { classes } = useStyles();
  console.log(name);
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar alt={name} radius="xl" />
        <Text size="sm">{name}</Text>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}

const Post = () => {
  const db = realTime(firebaseConfig);
  const location = useLocation();
  const { id, likes } = location.state;
  const [data, setData] = useState<IPostResponse | null>(null);
  const auth = getAuth();
  const [checked, setChecked] = useState<boolean>(false);

  const form = useForm<{ content: string }>({
    initialValues: {
      content: "",
    },
    validate: {
      content: (value) => (!value ? "Comment is required!" : null),
    },
  });

  useEffect(() => {
    onValue(ref(db, `/${id}`), (snapshot) => {
      setData(null);
      const d = snapshot.val();
      if (d !== null) {
        setData(d);
        setChecked(
          d.likes.filter((e: string) => e === auth?.currentUser?.uid).length > 0
        );
      }
    });
  }, []);

  return (
    <div key={data?.id}>
      <Image src={data?.imageUrl} />
      <Flex direction={"column"} justify={"start"} align={"start"}>
        <Text>{data?.title}</Text>
        <Text color="dimmed" size={"xs"}>
          @{data?.username}
        </Text>
        <div>
          <Chip
            checked={checked}
            onChange={() => {
              setChecked((v) => !v);
              handleLike({
                id,
                uid: auth?.currentUser?.uid as string,
                likes: data?.likes as [],
              });
            }}
          >
            {data?.likes?.length ?? 0} Likes
          </Chip>
        </div>
      </Flex>
      <Container my={10}>
        <form
          onSubmit={form.onSubmit((e) =>
            handleComment({
              comments: data?.comments as [],
              content: e.content,
              id,
              username: auth?.currentUser?.displayName as string,
            }).then(() => form.reset())
          )}
        >
          <TextInput
            placeholder="Your comment"
            label="Comment on post"
            {...form.getInputProps("content")}
          />
          <Button mt={10} type="submit">
            Submit
          </Button>
        </form>
      </Container>
      {data &&
        data?.comments?.map((e: any) => (
          <CommentHtml body={e.content} name={e.username} />
        ))}
    </div>
  );
};

export default Post;
