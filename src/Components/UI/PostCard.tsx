import { useAuth } from "@hooks/useAuth";
import {
  createStyles,
  Card,
  Image,
  Text,
  rem,
  Box,
  Flex,
  Chip,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLike } from "@services/postService";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export interface CardMediaProps {
  imageUrl: string;
  title: string;
  description: string;
  likes: any[];
  comments: any[];
  username: string;
  id: string;
}
function CardMedia(postData: CardMediaProps) {
  const { imageUrl, title, description, username, likes, comments, id } =
    postData;

  const { classes } = useStyles();
  const auth = useAuth();
  const [checked, setChecked] = useState<boolean>(
    likes.filter((e) => e === auth?.user?.uid).length > 0
  );

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Box component={Link} to={{ pathname: `/${id}` }} state={{ id, likes }}>
        {imageUrl && (
          <Card.Section>
            <Image src={imageUrl} alt={title} height={100} />
          </Card.Section>
        )}

        <Flex direction={"column"} justify={"start"} align={"start"} mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            {title}
          </Text>
          <Text fz="xs" color="dimmed" className={classes.title} mt={3}>
            @{username}
          </Text>
        </Flex>
        <Text mt="sm" mb="md" c="dimmed" fz="sm" lineClamp={4}>
          {description}
        </Text>
      </Box>
      <Card.Section className={classes.footer}>
        <div>
          <Chip
            checked={checked}
            onChange={() => {
              setChecked((v) => !v);
              handleLike({ id, uid: auth?.user?.uid as string, likes });
            }}
          >
            {likes.length} Likes
          </Chip>
        </div>
        <div>
          <Text weight={500} size="sm">
            {comments.length}
          </Text>
          <Text size="xs" color="dimmed">
            Comments
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}

export default CardMedia;
