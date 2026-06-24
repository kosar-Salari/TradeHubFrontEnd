import React from 'react';
import {
  ShoppingCart,
  Package,
  Trash2,
  CreditCard,
  Loader,
  CheckCircle,
  Plus,
  Minus,
  Tag,
  Truck,
  ShieldCheck
} from 'lucide-react';

const CartSection = ({
  cartItems,
  isProcessingPayment,
  isCreatingOrder,
  currentOrderId,
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponDiscount,
  calculateOriginalTotal,
  calculateProductDiscount,
  calculateTotal,
  calculateFinalTotal,
  getTotalItems,
  formatPrice,
  handleCreateOrder,
  handleCheckout,
  handleCouponSubmit,
  removeItem,
  updateQuantity
}) => {
  const hasCartItems = cartItems.length > 0;
  const productDiscount = calculateProductDiscount();
  const finalTotal = calculateFinalTotal();

  const getProductTitle = (item) =>
    item.name || (item.itemId ? `محصول ${String(item.itemId).substring(0, 8)}` : 'محصول');

  const decreaseQuantity = (item) => {
    const quantity = item.quantity || 1;
    if (quantity <= 1) return;
    updateQuantity(item.id, quantity - 1, quantity, item.itemId, item.websiteId);
  };

  const increaseQuantity = (item) => {
    const quantity = item.quantity || 1;
    updateQuantity(item.id, quantity + 1, quantity, item.itemId, item.websiteId);
  };

  return (
    <section id="cart-section" dir="rtl" className="scroll-mt-24 font-Kahroba px-4 md:px-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-sm">
            <ShoppingCart className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">سبد خرید</h2>
            <p className="mt-1 text-sm text-gray-500">
              {hasCartItems ? `${getTotalItems()} کالا در سبد شماست` : 'سبد خرید شما هنوز خالی است'}
            </p>
          </div>
        </div>

      </div>

      {!hasCartItems ? (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-md px-6 py-14 text-center md:py-20">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-9 w-9 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">سبد خرید خالی است</h3>
            <p className="text-sm leading-7 text-gray-500">
              هنوز محصولی به سبد خرید اضافه نکرده‌اید. بعد از انتخاب محصول، جزئیات سفارش اینجا نمایش داده می‌شود.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[minmax(0,1fr)_132px_164px_42px] items-center gap-4 border-b border-gray-100 bg-gray-50/80 px-5 py-4 text-xs font-bold text-gray-500 lg:grid xl:grid-cols-[minmax(0,1fr)_148px_180px_42px]">
                <span>محصول</span>
                <span className="text-center">تعداد</span>
                <span className="text-left">جمع</span>
                <span></span>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => {
                  const quantity = item.quantity || 1;
                  const unitPrice = Number(item.price) || 0;
                  const originalPrice = Number(item.originalPrice) || 0;
                  const itemTotal = unitPrice * quantity;
                  const isMinimumQuantity = quantity <= 1;
                  const discountPercent =
                    item.hasDiscount && originalPrice > unitPrice
                      ? Math.round(((originalPrice - unitPrice) / originalPrice) * 100)
                      : 0;

                  return (
                    <article
                      key={item.id || index}
                      className="group bg-white px-4 py-4 transition hover:bg-gray-50/70 lg:px-5"
                    >
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_132px_164px_42px] lg:items-center lg:gap-4 xl:grid-cols-[minmax(0,1fr)_148px_180px_42px]">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 lg:h-[74px] lg:w-[74px]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={getProductTitle(item)}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}

                            {discountPercent > 0 && (
                              <span className="absolute right-1.5 top-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-extrabold leading-5 text-white shadow-sm">
                                {discountPercent}٪
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h3 className="truncate text-base font-extrabold text-gray-900">
                                  {getProductTitle(item)}
                                </h3>

                                <div className="mt-2 min-w-0">
                                  <span className="block text-[11px] font-medium text-gray-400">قیمت واحد</span>

                                  <div className="mt-1 flex flex-nowrap items-center gap-2 whitespace-nowrap">
                                    {discountPercent > 0 ? (
                                      <>
                                        <span className="shrink-0 text-[11px] text-gray-400 line-through">
                                          {formatPrice(originalPrice)}
                                        </span>
                                        <span className="shrink-0 text-sm font-extrabold text-gray-900">
                                          {formatPrice(unitPrice)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="shrink-0 text-sm font-extrabold text-gray-900">
                                        {formatPrice(unitPrice)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-600 lg:hidden"
                                aria-label="حذف محصول"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 lg:justify-center lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
                          <span className="text-xs font-medium text-gray-500 lg:hidden">تعداد</span>
                          <div className="flex h-11 items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white transition hover:bg-gray-800"
                              aria-label="افزایش تعداد"
                            >
                              <Plus className="h-4 w-4" />
                            </button>

                            <span className="w-8 text-center text-sm font-extrabold text-gray-900">{quantity}</span>

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item)}
                              disabled={isMinimumQuantity}
                              className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                                isMinimumQuantity
                                  ? 'cursor-not-allowed text-gray-300'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              aria-label="کاهش تعداد"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 lg:block lg:border-0 lg:px-0 lg:py-0 lg:text-left">
                          <span className="text-xs font-medium text-gray-500 lg:hidden">جمع محصول</span>
                          <p className="whitespace-nowrap text-base font-extrabold text-gray-900 lg:text-lg">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>

                        <div className="hidden justify-end lg:flex">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label="حذف محصول"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="min-w-0">
            <div className="sticky top-24 space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">فاکتور سفارش</h3>
                  <p className="mt-1 text-xs leading-6 text-gray-500">بعد از ثبت سفارش، امکان وارد کردن کد تخفیف فعال می‌شود.</p>
                </div>
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">قیمت اصلی محصولات</span>
                  <span className="whitespace-nowrap font-bold text-gray-900">{formatPrice(calculateOriginalTotal())}</span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">قیمت محصولات</span>
                  <span className="whitespace-nowrap font-bold text-gray-900">{formatPrice(calculateTotal())}</span>
                </div>

                {productDiscount > 0 && (
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">تخفیف محصولات</span>
                    <span className="whitespace-nowrap font-bold text-red-600">{formatPrice(productDiscount)}</span>
                  </div>
                )}

                {appliedCoupon && couponDiscount > 0 && (
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">تخفیف کد</span>
                    <span className="whitespace-nowrap font-bold text-green-600">{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">تعداد آیتم‌ها</span>
                  <span className="whitespace-nowrap font-bold text-gray-900">{getTotalItems()} عدد</span>
                </div>

                {/* <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">هزینه ارسال</span>
                  <span className="whitespace-nowrap font-bold text-green-600">رایگان</span>
                </div> */}
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-sm font-bold text-gray-700">مبلغ قابل پرداخت</span>
                  <span className="whitespace-nowrap text-xl font-extrabold text-gray-900">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {!currentOrderId ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleCreateOrder}
                    disabled={isCreatingOrder || cartItems.length === 0}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-bold shadow-sm transition ${
                      isCreatingOrder || cartItems.length === 0
                        ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                        : 'bg-gray-900 text-white hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md'
                    }`}
                  >
                    {isCreatingOrder ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        در حال ثبت سفارش...
                      </>
                    ) : (
                      <>
                        <Package className="h-5 w-5" />
                        ثبت سفارش
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-6 text-gray-500">
                    ابتدا سفارش را ثبت کنید؛ سپس کد تخفیف و پرداخت نهایی نمایش داده می‌شود.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      کد تخفیف اعمال شد
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-800">کد تخفیف دارید؟</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="کد تخفیف را وارد کنید"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-10 pl-3 text-sm outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCouponSubmit}
                        disabled={!couponCode.trim()}
                        className={`rounded-2xl px-4 text-sm font-bold transition ${
                          !couponCode.trim()
                            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        اعمال
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isProcessingPayment}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-bold shadow-sm transition ${
                      isProcessingPayment
                        ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                        : 'bg-gray-900 text-white hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md'
                    }`}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        در حال اتصال به درگاه...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        پرداخت نهایی
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className=" gap-3 pt-1 text-xs text-gray-500">
                {/* <div className="flex items-center justify-center gap-2 rounded-2xl bg-gray-50 px-3 py-3">
                  <Truck className="h-4 w-4 text-gray-400" />
                  ارسال رایگان
                </div> */}
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-gray-50 px-3 py-3">
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  پرداخت امن
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartSection;
