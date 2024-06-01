<!-- <script context="module">
// @ts-ignore
  export async function load({ page, fetch }) {
    const { slug } = page.params;
    // Aquí puedes cargar los datos del lugar basado en el slug
    // Por ejemplo, podrías hacer una solicitud a una API
    const res = await fetch(`api/url/${slug}`);
    const data = await res.json();

    return {
      props: {
        place: data
      }
    };
  }
</script> -->

<svelte:head>
	<title>Blogs</title>
	<meta name="description" content="Blogs" />
</svelte:head>

<script>
  import { fade, fly } from 'svelte/transition'
  
  let blogs = [
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 },
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 },
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 },
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 },
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 },
    { owner:"Example Owner", title:"Title Example", created_at: 'May 10', likes: 1000 }
  ];
</script>

<div class="blogs-container">
  <div class="blogs-title" in:fade={{ duration:1500 }}>
    <h1 class="title">Blogs</h1>
    <p>descubre lo que la comunidad tiene para tí</p>
  </div>  
  <div class="sm:mx-6 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal" in:fly={{ y:200, duration:1000 }}>
            <thead>
                <tr>
                    <th
                        class="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Owner
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created at
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Likes
                    </th>
                </tr>
            </thead>
            <tbody>
              {#each blogs as blog, i}
                <tr class="hover:bg-gray-100">
                  <td class="px-10 py-5 border-b border-gray-200 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{ blog.title }</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10">
                              <img class="w-full h-full rounded-full"
                                  src="https://th.bing.com/th/id/OIP.HHVUf3TYqncgpJXyCMmxyAHaHa?rs=1&pid=ImgDetMain"
                                  alt="" />
                          </div>
                          <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                  { blog.owner }
                              </p>
                          </div>
                      </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                          { blog.created_at }
                      </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                          <span class="relative">{ blog.likes }</span>
                      </span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
    </div>
  </div>
</div>

<style>
  .blogs-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 100%;
    height: 100%;
  }
  .blogs-title {
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 60px;
  }
</style>
