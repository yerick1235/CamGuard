import google.generativeai as genai
import os
import sys

def describe_image(image_url):
    genai.configure(api_key="AIzaSyDHg9Kdrbi37tkyqk-x7OMHDeumz0Gg2Pw")
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content([
            """
            Describe de manera detallada y objetiva a la persona visible en la imagen capturada por la ESP32-CAM, considerando las limitaciones típicas del dispositivo (baja resolución, ruido, poca iluminación o colores distorsionados). Incluye únicamente lo que sea claramente identificable, evitando suposiciones no verificables.

            **1. Rasgos físicos:**
               - **Género aparente** (solo si es evidente; de lo contrario, omítelo).
               - **Edad aproximada** (rango amplio, ej. '30-50 años').
               - **Color y longitud del cabello** (ej. 'pelo corto negro', 'coleta rubia desenfocada').
               - **Vello facial** (ej. 'barba incipiente', 'bigote visible', 'sin vello facial discernible').

            **2. Vestimenta:**
               - **Color y tipo de prenda superior** (ej. 'camiseta blanca', 'sudadera gris con capucha').
               - **Prenda inferior** (si es visible, ej. 'pantalones azules oscuros').
               - **Accesorios** (gorras, gafas, collares, etc., solo si son claros).

            **3. Calidad de la imagen:**
               - Señala limitaciones como: 'rostro parcialmente borroso por movimiento', 'colores desaturados debido a la iluminación', 'sombras que ocultan detalles'.

            **4. Contexto observable (si aplica):**
               - Postura (ej. 'de pie frente a la cámara', 'sentado en una silla').
               - Entorno inmediato (ej. 'fondo blanco difuso', 'pared con estante detrás').

            **Ejemplo de respuesta válida:**
            "Persona de género masculino aparente, entre 25-40 años, pelo corto negro y barba corta poco definida. Viste una camiseta oscura (posiblemente azul) y pantalón claro. El rostro está ligeramente desenfocado por movimiento, y la imagen tiene ruido en zonas oscuras. Fondo irreconocible por baja resolución."

            **Normas:**
            - **No inventes detalles** si no son claramente visibles (ej. emociones, marcas de ropa).
            - **Sé conciso** y usa lenguaje neutral.
            """,
            image_url
    ])
    return ('Descripción: ')+response.text



