export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Drive Upload API</h1>
      <p>API untuk upload file ke Google Drive</p>
      <h2>Endpoint:</h2>
      <p><strong>POST</strong> /api/upload</p>
      <h2>Usage:</h2>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
{`curl -X POST \\
  https://drive-upload-api-ten.vercel.app/api/upload \\
  -F "file=@/path/to/your/file.jpg"`}
      </pre>
    </div>
  );
}
