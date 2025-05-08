export default function Demo() {
    const [isMutating,setIsMutating] = useState(true);

    useEffect(()=>{
        setIsMutating(false);
    },[]);

    if(isMutating){
        return <div>Loading...</div>;
    }
  return <div>Demo</div>;
}