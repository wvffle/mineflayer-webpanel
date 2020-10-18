<template>
  <div>
    <h1 class="text-2xl pb-4 flex justify-between items-center">
      Projects

      <div class="flex items-center cursor-pointer text-sm hover:text-green-400">
        <FolderPlusIcon size="1x" class="text-green-400 text-xl mr-2" />
        Add new project
      </div>
    </h1>


    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white shadow-sm p-4 rounded text-sm grid gap-2 cursor-pointer hover:shadow transition duration-100" style="grid-template-columns: auto 1fr">
        <div class="font-bold flex items-center">
          <BookIcon class="mr-2 text-orange-400" />
          Name:
        </div>
        <div>my-bot</div>

        <div class="font-bold flex items-center">
          <FolderIcon class="mr-2 text-orange-400" />
          Directory:
        </div>
        <div class="truncate">~/workspace/mineflayer-bots/my-bot</div>
      </div>



      <div class="bg-green-400 shadow-sm p-4 rounded flex items-center justify-center cursor-pointer hover:bg-green-500 hover:shadow transition duration-100" style="height: 5.125rem">
        <FolderPlusIcon size="1x" class="text-white text-3xl" />
      </div>
    </div>
  </div>
</template>

<script>
import { FolderIcon, FolderPlusIcon, BookIcon } from '@zhuowenli/vue-feather-icons'

export default {
  name: 'Projects',

  components: {
    FolderIcon,
    FolderPlusIcon,
    BookIcon
  }
}
</script>
