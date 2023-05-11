import {
  createStyles,
  Avatar,
  Text,
  Group,
  Button,
  Paper,
  FileInput,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { UploadProfile } from "@services/imageupload";
import { User, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function MyProfile() {
  const { classes } = useStyles();
  const auth = getAuth();
  const { currentUser } = auth;
  const [profileUpdate, setProfileUpdate] = useState<boolean>(false);
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onProfileUpdate = async ({ file }: { file: File }) => {
    setLoading(true);
    try {
      const url = await UploadProfile(file, currentUser?.uid as string);
      await updateProfile(auth.currentUser as User, {
        photoURL: url as string,
      });
      showNotification({
        message: "Profile updated",
        title: "Success",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        color: "red",
        message: "Failed to update",
      });
    }
    setLoading(false);
    setProfileUpdate(false);
  };

  return (
    <div>
      <Group noWrap>
        <Avatar src={currentUser?.photoURL} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Your Book User
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {currentUser?.displayName}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text fz="xs" c="dimmed">
              @{currentUser?.email}
            </Text>
          </Group>
        </div>
      </Group>
      {!profileUpdate && (
        <Button onClick={() => setProfileUpdate(true)}>
          {" "}
          Update profile picture
        </Button>
      )}
      {profileUpdate && (
        <Paper w={"50%"} p={20} mt={10}>
          <FileInput
            value={value}
            onChange={setValue}
            label="Your new profile picture"
            required
            placeholder="Show world how beautiful you are!"
          />
          <Box mt={10}>
            <Button
              mr={10}
              loading={loading}
              onClick={() => onProfileUpdate({ file: value as File })}
            >
              Submit
            </Button>
            <Button variant="subtle" onClick={() => setProfileUpdate(false)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
}

export default MyProfile;
