export async function handleProducts(){
    try {
        const data = await fetch(`${process.env.API}/products`,{
        cache:'no-store' // ssr
    })
    const res = await data.json()
    return res?.data
    } catch (error) {
        console.log(error)
        ;
        console.log('cant fetch');

    }
}