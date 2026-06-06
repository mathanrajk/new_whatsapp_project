import React,{useState}from 'react'
import './WhatsAppSong.css'

function WhatsAppSong() {
    const [personName, setPersonName] = useState('');
    const [songFile, setSongFile] = useState(null);

    const handleGenerateSong = async () => {
       if(!personName || !songFile){
        alert('Please enter a name and select a song file');
        return;
       }
       try {
         const fileContent = await songFile.text();
         const lines = fileContent.split('\n');
         
         const parsedData = lines.map((line, index) => ({
           id: index,
           content: line.trim()
         })).filter(item => item.content.length > 0);

         console.log('Parsed Data Array:', parsedData);
        const res = await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personName, songData: parsedData }),
        }); 
        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const result = await res.json();
        console.log('Response from server:', result);
         alert('Song generated and sent successfully!');      
        
       } catch (error) {
         console.error('Error details:', error);
         if (error instanceof TypeError && error.message === 'Failed to fetch') {
           alert('Failed to connect to the server. Please make sure your FastAPI backend is running on http://localhost:8000.');
         } else {
           alert('There was an error processing your request: ' + error.message);
         }
       }
    }
  return (
    <div className='container'>
        <h1 className='title'>WhatsApp Song Generator</h1>
       <div className='inner_container'>
        <label>Person Name or number</label>
        <input 
          type="text" 
          placeholder='Enter the name or number of the person' 
          value={personName} 
          onChange={(e) => setPersonName(e.target.value)} 
        />
         <label htmlFor="songFile">Whatsapp song file upload </label>
         <input 
           id="songFile" 
           type="file" 
           accept=".txt" 
           onChange={(e) => setSongFile(e.target.files[0])} 
         />
          <button className='generate_btn' onClick={handleGenerateSong}>
            Generate Song
          </button>
       </div>

    </div>
  )
}

export default WhatsAppSong