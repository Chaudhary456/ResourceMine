import React, {useState} from 'react';
import { useParams } from "react-router";

function FileUploadPage(){
    const { branch, year, subject } = useParams();

	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
        console.log(event.target.files[0]);
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();
		formData.append('File', selectedFile);
        // console.log(formData)
        // const fileobj={
        //     year,branch,subject,document:selectedFile
        // }
        fetch("http://localhost:8000/document/upload",
			{
				method: 'POST',
				body: FormData,
                'content-type': 'multipart/form-data'
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default FileUploadPage; 