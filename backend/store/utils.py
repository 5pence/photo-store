from io import BytesIO
from django.template.loader import get_template
from django.http import HttpResponse
from weasyprint import HTML
from .models import Order


def generate_invoice(order_id):
    """Generate a PDF invoice for an order."""
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return None

    template = get_template("invoice_template.html")
    html_content = template.render({"order": order})

    pdf_file = BytesIO()
    HTML(string=html_content).write_pdf(pdf_file)
    pdf_file.seek(0)

    return pdf_file
