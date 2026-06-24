import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const PreviousOrdersSection = ({
  previousOrders,
  formatPrice,
  navigate,
  slug
}) => {
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderProducts = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusIcon = (status) => {
    return status === 'Paid' ? (
      <CheckCircle className="w-4 h-4 text-emerald-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusText = (status) => {
    return status === 'Paid' ? 'پرداخت شده' : 'لغو شده';
  };

  const getStatusColor = (status) => {
    return status === 'Paid'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <section id="previous-section" className="scroll-mt-24 font-Kahroba px-4 py-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div>
            <img
              src="/website/product3.png"
              alt="محصول"
              className="w-[75px] h-[75px] object-contain"
            />
          </div>

          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              سفارش‌های قبلی
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              محصولاتی که قبلاً خریداری کرده‌اید
            </p>
          </div>
        </div>

        {previousOrders.length > 0 && (
          <span className="hidden sm:inline-flex bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
            {previousOrders.length} سفارش
          </span>
        )}
      </div>

      {previousOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">سفارشی یافت نشد</h3>
          <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          {previousOrders.map((order) => {
            const items = order.items || [];
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

            const isExpanded = expandedOrders[order.id] || false;
            const visibleItems = isExpanded ? items : items.slice(0, 1);
            const hiddenItemsCount = Math.max(items.length - 1, 0);

            return (
              <div
                key={order.id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="space-y-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-xs text-gray-400 mb-1">مبلغ پرداختی</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-gray-900 whitespace-nowrap">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="text-xs text-gray-400 mb-1">تعداد محصولات</div>
                      <div className="font-bold text-gray-800">{items.length} محصول</div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="text-xs text-gray-400 mb-1">تعداد کل آیتم‌ها</div>
                      <div className="font-bold text-gray-800">{totalQuantity} عدد</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="font-bold text-gray-800 text-sm">محصولات سفارش</h4>
                      <span className="text-xs text-gray-400">لیست خرید</span>
                    </div>

                    <div
                      className={`space-y-2 pr-1 pl-1 ${isExpanded && items.length > 4
                        ? 'max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full'
                        : ''
                        }`}
                    >
                      {visibleItems.map((item, index) => (
                        <div
                          key={`${item.itemId || item.name}-${index}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-300" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-gray-800 text-sm truncate">
                              {item.name}
                            </h5>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500 bg-white border border-gray-100 px-2 py-1 rounded-full">
                                تعداد: {item.quantity}
                              </span>
                              <span className="font-bold text-gray-700 text-xs sm:text-sm">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (order.status === 'Canceled') {
                                navigate(`/${slug}/product/${item.itemId}`);
                              } else {
                                navigate(`/${slug}/order/product/${order.id}`);
                              }
                            }}
                            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white text-xs px-3 py-2 rounded-xl transition-colors flex-shrink-0"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">مشاهده</span>
                          </button>
                        </div>
                      ))}

                      {items.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => toggleOrderProducts(order.id)}
                          className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-200 text-gray-700 rounded-2xl px-4 py-3 text-sm font-bold transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span>بستن لیست محصولات</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>نمایش {hiddenItemsCount} محصول دیگر</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold border border-transparent invisible"
                        >
                          جای خالی
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-l from-gray-900 via-gray-500 to-gray-200 opacity-80" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PreviousOrdersSection;