from django.urls import path
from . import handlers


urlpatterns = [
    path("add-number-to-sales", handlers.add_number_to_sales),
    path("sales-data-handler", handlers.sales_data_handler),
    path("update-sales-note", handlers.update_sales_note),
    path("sales-order-handler", handlers.sales_order_handler),
    path("all-sales-order-handler", handlers.all_sales_order_handler),
]
