import ImageUpload from "@components/ImageUpload";
import useAddPost from "@hooks/useAddPost";
import { Button, TextInput, Textarea } from "@mantine/core";
import React from "react";

const CreatePost = ({
  setShowAdd,
}: {
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { form, handleAddPost } = useAddPost();

  return (
    <div>
      <form
        onSubmit={form.onSubmit((e) =>
          handleAddPost(e).then(() => setShowAdd(false))
        )}
      >
        <TextInput
          label="What's on your mind?"
          placeholder="Write something here..."
          withAsterisk
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Describe how you feel"
          placeholder="Write something here..."
          {...form.getInputProps("description")}
        />

        <ImageUpload
          mt={20}
          onSuccess={(e: string) => form.setFieldValue("imageUrl", e)}
        />

        <Button type="submit" mt={30} mr={10}>
          Submit
        </Button>
        <Button variant="subtle" onClick={() => setShowAdd(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
