import json
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

def extract_cdata_info(description_text):
    """
    Uses BeautifulSoup to extract information from CDATA content.
    Returns each item as key-value pairs.
    """
    if not description_text:
        return {
            "Urun_bilgisi": "Unknown",
            "Fabric": "Unknown",
            "Model_measurements": "Unknown",
            "Product_measurements": "Unknown",
            "Sample_size": "Unknown"
        }

    soup = BeautifulSoup(description_text, 'html.parser')
    elements = soup.find_all('li')

    def extract_text(label, allow_fallback=True):
        """
        Extracts the content for the specified label. If ':' is not found,
        returns the entire text or falls back to 'Unknown'.
        """
        for element in elements:
            if label.lower() in element.text.lower():
                text_content = element.get_text(strip=True)
                parts = text_content.split(":", 1)
                # Return the part after ':' if it exists
                if len(parts) > 1:
                    return parts[1].strip()
                # If ':' is not found, return the full text or 'Unknown'
                return text_content.strip() if allow_fallback else "Unknown"
        return "Unknown"

    # Extract the required information
    urun_bilgisi = extract_text("Ürün Bilgisi")
    fabric = extract_text("Kumaş Bilgisi")
    model_measurements = extract_text("Model Ölçüleri")
    product_measurements = extract_text("Ürün Ölçüleri")
    sample_size = extract_text("Modelin üzerindeki ürün", allow_fallback=True)

    return {
        "Urun_bilgisi": urun_bilgisi,
        "Fabric": fabric,
        "Model_measurements": model_measurements,
        "Product_measurements": product_measurements,
        "Sample_size": sample_size
    }

def parse_xml_to_json(file_path):
    """
    Converts an XML file to JSON format and saves it to 'data/products.json'.
    """
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
    except FileNotFoundError:
        print(f"Error: '{file_path}' not found.")
        return
    except ET.ParseError as e:
        print(f"Error: Failed to parse XML. {e}")
        return

    products_list = []

    for product in root.findall('Product'):
        product_id = product.get('ProductId')
        product_name = product.get('Name')
        description = product.find('Description')
        description_text = description.text if description is not None else ""

        # Extract information from CDATA content
        cdata_info = extract_cdata_info(description_text)

        # Get images
        images = [img.get('Path') for img in product.findall('.//Image')]
        
        # Get product details
        details = {detail.get('Name'): detail.get('Value') for detail in product.findall('.//ProductDetail')}

        # Prepare product data in JSON format
        try:
            product_data = {
                "StockCode": product_id,
                "Name": product_name,
                "Description": cdata_info,
                "Images": images,
                "Price": float(details.get('Price', '0').replace(',', '.')),
                "DiscountedPrice": float(details.get('DiscountedPrice', '0').replace(',', '.')),
                "Quantity": int(details.get('Quantity', '0')),
                "Color": details.get('Color', 'Unknown'),
                "Series": details.get('Series', 'Unknown'),
                "Season": details.get('Season', 'Unknown')
            }
        except ValueError as e:
            print(f"Data error: {e}")
            continue

        products_list.append(product_data)

    # Save to JSON file, encoding in UTF-8 for Turkish characters 
    try:
        with open('data/products.json', 'w', encoding='utf-8') as json_file:
            json.dump(products_list, json_file, ensure_ascii=False, indent=4)
        print("XML data successfully converted to JSON and saved to 'data/products.json'.")
    except IOError as e:
        print(f"File write error: {e}")

# Enter the full path to your XML file
parse_xml_to_json(r'C:\Users\borab\Desktop\En Son\src\services\lonca-sample.xml')
