/**
 * Comprime uma imagem no lado do cliente.
 * @param {File} file - O ficheiro de imagem original.
 * @param {number} maxWidth - Largura máxima permitida (padrão: 1024px).
 * @param {number} quality - Qualidade da imagem resultante de 0 a 1 (padrão: 0.8).
 * @returns {Promise<Blob>} - Ficheiro otimizado para upload.
 */
export async function compressImage(file, maxWidth = 1024, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Redimensionamento proporcional
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converter de volta para ficheiro (Blob)
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
}
