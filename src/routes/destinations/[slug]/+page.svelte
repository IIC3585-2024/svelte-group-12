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

<script>
  const place = {
    name: 'Lugar',
    description: 'Descripción del lugar'
  };
</script>

<h1>{place.name}</h1>
<p>{place.description}</p>