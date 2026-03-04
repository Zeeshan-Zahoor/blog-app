import React, {useCallback, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select} from "../index"
import service from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RTE from "../RTE"




function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      title: post?.title || "", 
      slug: post?.$id || "", 
      content: post?.content || "", 
      status: post?.status || 'active',
    }
  })
  
  console.log("Post ID:", post?.$id);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const userData = useSelector(state => state.auth.userData)

 const submit = async (data) => {
  console.log("Submitting with ID:", post?.$id);
  console.log("Slug in data:", data?.slug);
  setLoading(true);
  
  try {
    let file = null;

    // Upload new image if exists
    if (data.image && data.image[0]) {
      file = await service.uploadFile(data.image[0]);
    }

    if (post) {
      // UPDATE POST
      if (file) {
        await service.deleteFile(post.featureImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : post.featureImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }

    } else {
      // CREATE NEW POST
      const dbPost = await service.createPost({
        ...data,
        featureImage: file ? file.$id : null,
        userId: userData.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }

  } catch (error) {
    console.log("Post submission error:", error);
  }

  setLoading(false)
};


  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string') {
      return value
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s/g, '-')
    }

    return '';
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name == 'title') {
        setValue('slug', slugTransform(value.title, {shouldValidate: true}))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  return (
  <form
    onSubmit={handleSubmit(submit)}
    className="w-full mx-auto bg-white p-6 rounded-xl shadow-md flex flex-wrap gap-6"
  >
    {/* LEFT SIDE */}
    <div className="w-full">
      <div className="bg-gray-50 p-6 rounded-lg border">

        <Input
          label="Title"
          placeholder="Enter post title"
          className="mb-5"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="post-url-slug"
          className="mb-5"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue(
              "slug",
              slugTransform(e.currentTarget.value),
              { shouldValidate: true }
            );
          }}
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="w-full">
      <div className="bg-gray-50 p-6 rounded-lg border space-y-5">

        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full">
            <p className="text-sm text-gray-500 mb-2">Current Image</p>
            <img
              src={service.getFilePreview(post.featureImage)}
              alt={post.title}
              className="rounded-lg border"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          disabled={loading}
          bgColor={post ? "bg-green-600" : "bg-blue-600"}
          className="w-full py-2 text-white font-medium hover:opacity-90 transition"
        >
          {loading ? "Saving..." : post ? "Update" : "Submit"}
        </Button>

      </div>
    </div>
  </form>
);
}

export default PostForm