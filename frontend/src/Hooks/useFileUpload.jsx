export default function useFileUpload(initialValue) {
    const [file, setFile] = React.useState(initialValue);
    const [error, setError] = React.useState(null);


    React.useEffect(() => {
        if (file) {
            setError(null);
        }
    }, [file]);

    const handleFileChange = (evt) => {
        const file = evt.target.files?.[0];
        const fileName = file?.name;
        console.log(file)

        const getFileExtension = fileName?.slice(
            (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
        );

        if (!file) {
            return;
        }

        // if (!/kml|gml|dxf|png|jpg/.test(getFileExtension)) {
        //   setError("Error: Invalid file type");
        //   return;
        // }

        setFile(file);
    };

    return [file, error, handleFileChange];
};

