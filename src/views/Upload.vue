<template>
  <div class="view-container upload-container">
    <div class="metadata-container">
      <input
        id="fileSelection"
        style="display: none"
        type="file"
        accept="image/*"
        @change="onFileSelected"
      />
      <button @click="openFileBrowser">Choose Image</button>
      <div class="textarea-container">
        <textarea
          v-model="caption"
          placeholder="caption..."
          maxlength="250"
        ></textarea>
        <div class="length">{{ caption.length ?? 0 }}/250</div>
      </div>
    </div>
    <div class="image-container">
      <img :src="imageUrl" alt="upload image" />
    </div>
    <div class="button-container">
      <button :disabled="isUploadDisabled" @click="uploadPost">
        Upload
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/models";
import { Cloudinary, CloudinaryApiResponse } from "@/settings/cloudinary";
import { auth } from "@/settings/firebase";
import { AxiosResponse } from "axios";
import { computed, ref, inject } from "vue";
import { Toast } from "vue-dk-toast";
import { useStore } from "vuex";
import { v4 } from "uuid";

export default {
  name: "Upload",
  setup() {
    const store = useStore();
    const toast = inject<Toast>("$toast");

    const caption = ref("");
    const isImagePresent = ref(false);

    const getDefaultImage = () => {
      return require("@/assets/icons/default_image.png");
    };

    const imageUrl = ref(getDefaultImage());

    const openFileBrowser = (): void => {
      document.getElementById("fileSelection")?.click();
    };

    const onFileSelected = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target?.files?.item(0);

      if (!file) {
        return;
      }

      const reader = new FileReader();
      const fileSizeMb = file ? file.size / 1024 / 1024 : 0;

      const pattern = new RegExp("image/*");
      if (fileSizeMb < 1 && file?.type.match(pattern)) {
        reader.addEventListener("load", () => {
          imageUrl.value = reader.result;
        });
        reader.readAsDataURL(file);
        isImagePresent.value = true;
      } else {
        if (toast) {
          toast("Invalid Image (Invalid file type or file size > 1MB)", {
            type: "error"
          });
        }
      }
    };

    const isUploadDisabled = computed((): boolean => {
      return imageUrl.value === getDefaultImage() || !caption.value.length;
    });

    const uploadPost = (): void => {
      Cloudinary.upload(imageUrl.value)
        .then((result: AxiosResponse<CloudinaryApiResponse>) => {
          const post = {
            uuid: v4(),
            userUid: auth.currentUser?.uid,
            caption: caption.value,
            image: result.data.secure_url
          } as Post;

          store.dispatch("uploadPost", post).then(() => {
            if (toast) {
              toast("Successfully Uploaded", { type: "success" });
            }
            imageUrl.value = getDefaultImage();
            caption.value = "";
          });
        })
        .catch(() => {
          if (toast) {
            toast("Error while uploading. Please try again.", {
              type: "error"
            });
          }
        });
    };

    return {
      imageUrl,
      caption,
      isImagePresent,
      isUploadDisabled,
      onFileSelected,
      openFileBrowser,
      uploadPost
    };
  }
};
</script>

<style scoped lang="scss">
.upload-container {
  width: calc(100% - 30px);
  height: calc(100% - 80px);
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .metadata-container {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .textarea-container {
      width: 50%;
      height: 30%;
      justify-content: space-between;

      textarea {
        resize: none;
        width: 100%;
        height: 70%;
      }

      .length {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .image-container {
    width: 100%;
    height: 50%;
    display: flex;

    img {
      margin: 0 auto;
      place-self: center;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .button-container {
    width: 100%;
    min-height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
