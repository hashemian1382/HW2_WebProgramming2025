<div dir="rtl">

# نقاشی بکش لویی (بخش اول) - تمرین دستگرمی دوم برنامه نویسی وب

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sharif-University-of-Technology.jpg" alt="لوگوی دانشگاه صنعتی شریف" width="200">
</p>

<p align="center">
  <b>دانشگاه صنعتی شریف</b><br>
  دانشکده مهندسی کامپیوتر<br>
  درس برنامه‌نویسی وب - بهار ۱۴۰۴
  <br>استاد درس: دکتر یحیی پورسلطانی
</p>

<p align="center">
  <b>علی هاشمیان</b><br>
  شماره دانشجویی: ۴۰۱۱۰۶۶۸۵
</p>

---

### ۱. مقدمه و اهداف پروژه

این پروژه به عنوان یک تمرین دستگرمی برای مرور مفاهیم کلیدی در توسعه واسط کاربری با استفاده از کتابخانه React و زبان TypeScript طراحی شده است. هدف اصلی، ساخت یک برنامه نقاشی کوچک و تک‌صفحه‌ای بود که در آن کاربر قادر به انجام عملیات زیر باشد:

*   ترسیم اشکال هندسی (مربع، دایره، مثلث) روی یک بوم.
*   جابجایی اشکال روی بوم با استفاده از قابلیت Drag and Drop.
*   حذف یک شکل با دو بار کلیک کردن روی آن.
*   مشاهده تعداد هر یک از اشکال موجود روی بوم.
*   ذخیره کردن (Export) کل نقاشی در یک فایل با فرمت JSON.
*   بارگذاری (Import) یک نقاشی از فایل JSON.
*   تغییر عنوان نقاشی.


### ۲. ساختار پروژه

برای سازماندهی بهتر کدها و تفکیک مسئولیت‌ها، پروژه با ساختار فایل استاندارد زیر پیاده‌سازی شد:

```html
/src
|-- /components
|   |-- Canvas.tsx
|   |-- Header.tsx
|   |-- Shape.tsx
|   |-- ShapeCounter.tsx
|   |-- Sidebar.tsx
|-- /context
|   |-- PaintingContext.tsx
|-- /types
|   |-- index.ts
|-- App.tsx
|-- index.css
|-- main.tsx
```

این ساختار به ما اجازه می‌دهد که هر بخش از برنامه (مانند کامپوننت‌ها یا منطق مدیریت وضعیت) به صورت مستقل توسعه داده شده و به راحتی قابل مدیریت باشد.

### ۳. پیاده‌سازی و شرح کد

#### ۳.۱. مدیریت وضعیت سراسری با Context API

یکی از نیازمندی‌های کلیدی پروژه، به اشتراک‌گذاری داده‌های مشترک (مانند لیست اشکال و عنوان نقاشی) بین کامپوننت‌های مختلف بود. برای مثال، کامپوننت `Sidebar` باید بتواند شکلی را به لیستی که در کامپوننت `Canvas` نمایش داده می‌شود اضافه کند و کامپوننت `ShapeCounter` باید همان لیست را برای شمارش بخواند.

برای جلوگیری از ارسال مکرر `props` در درخت کامپوننت‌ها (Props Drilling)، از **React Context API** استفاده شد.

در فایل **`PaintingContext.tsx`**، یک `Context` جدید ساخته شده است که وضعیت کلی برنامه (`PaintingState`) شامل `title` و آرایه‌ای از `shapes` را نگهداری می‌کند. همچنین توابعی برای دستکاری این وضعیت (مانند `addShape`, `removeShape`, `loadPainting`) در اختیار کامپوننت‌های فرزند قرار می‌دهد.
هوک سفارشی **`usePainting`**، منطق استفاده از `useContext` را کپسوله کرده و استفاده از `Context` را در کامپوننت‌ها ساده‌تر و خواناتر می‌کند.

#### ۳.۲. شرح کامپوننت‌ها

در ادامه به توضیح کامپوننت ها، کارکرد و نقش آن ها می پردازم.

*   کامپوننت **`Header.tsx`** مسئول نمایش عنوان نقاشی و دکمه‌های Import/Export است.

قابلیت `Export`: با کلیک روی این دکمه، وضعیت فعلی برنامه از `Context` خوانده شده، به یک رشته JSON تبدیل می‌شود و سپس با استفاده از `Blob` و ایجاد یک تگ `<a>` به صورت داینامیک، به عنوان یک فایل دانلود می‌شود.

قابلیت `Import`: برای این کار، از یک `input` از نوع `file` که به صورت مخفی است، استفاده شده است. با کلیک روی دکمه Import، روی این `input` کلیک می‌شود. پس از انتخاب فایل، محتوای آن با `FileReader` خوانده شده، به شیء جاوااسکریپت `parse` می‌شود و در نهایت با فراخوانی تابع `loadPainting` از `Context`، کل برنامه به‌روزرسانی می‌شود.

*   کامپوننت **`Sidebar.tsx`** نوار ابزار کناری است که شامل اشکال قابل ترسیم است. هر شکل یک کامپوننت `ToolShape` است که با شروع عمل Drag (`onDragStart`)، نوع شکل (`shapeType`) را در `dataTransfer` ذخیره می‌کند تا کامپوننت `Canvas` بتواند آن را بخواند.

*   کامپوننت **`Canvas.tsx`** بوم اصلی نقاشی است. این کامپوننت به رویدادهای `onDrop` و `onDragOver` گوش می‌دهد.

هنگام رها شدن (Drop) یک آیتم، این کامپوننت بررسی می‌کند که آیا آیتم از نوار ابزار آمده (با خواندن `shapeType`) یا یک شکل موجود در بوم است که در حال جابجایی است (با خواندن `shapeId`). سپس تابع مناسب از `Context` (`addShape` یا `updateShapePosition`) را فراخوانی می‌کند.

*   کامپوننت **`Shape.tsx`** یک شکل تنها را روی بوم نمایش می‌دهد.
*   
موقعیت آن با استفاده از `style` و مقادیر `x` و `y` که از `Context` می‌آید، تعیین می‌شود.

با رویداد `onDoubleClick`، تابع `removeShape` از `Context` فراخوانی شده و شکل حذف می‌شود.

این کامپوننت نیز `draggable` است و در `onDragStart`، شناسه‌ی خود (`shapeId`) و فاصله کلیک موس از گوشه‌های شکل (`offsetX`, `offsetY`) را در `dataTransfer` ذخیره می‌کند تا جابجایی به نرمی صورت گیرد.

*   کامپوننت **`ShapeCounter.tsx`** در پایین صفحه قرار دارد و تعداد هر شکل را نمایش می‌دهد. این کامپوننت لیست اشکال را از `Context` می‌خواند و با استفاده از متد `reduce` روی آرایه، تعداد هر نوع شکل را محاسبه و نمایش می‌دهد.

### ۴. چالش‌ها و تصمیمات طراحی

مهم‌ترین چالش فنی این پروژه، **ترسیم صحیح و مدیریت مثلث** بود. در حالی که دایره و مربع به سادگی با `border` و `border-radius` در CSS قابل پیاده‌سازی هستند، مثلث در CSS ماهیت ذاتی ندارد.

*   **تلاش‌های ناموفق اولیه:** در ابتدا سعی کردم با ترفندهای CSS مانند استفاده از `border`های ضخیم یا `clip-path` مثلث را ایجاد کنم. این روش‌ها از نظر ظاهری کار می‌کردند، اما "جعبه موقعیت‌یابی" (Layout Box) عنصر را خراب می‌کردند. این امر باعث می‌شد که هنگام Drag and Drop، محاسبات مربوط به موقعیت مثلث با مربع و دایره متفاوت باشد و در نتیجه، مثلث در جای اشتباهی روی بوم قرار گیرد.
*   **راه حل نهایی:** پس از بررسی‌های مختلف، به این نتیجه رسیدم که بهترین راه حل، استفاده از **SVG** است. یک SVG کوچک که شکل یک مثلث توخالی را تعریف می‌کند، به عنوان `background-image` برای `div` مثلث تنظیم شد. این روش مزایای زیر را داشت:
    1.  ساختار `div` مثلث به صورت یک جعبه مربعی ساده باقی ماند و رفتاری کاملاً مشابه مربع و دایره در عملیات Drag and Drop داشت.
    2.  ظاهر مثلث به صورت کاملاً دقیق و تمیز، بدون هیچ‌گونه عوارض جانبی (مانند کادر اضافه) پیاده‌سازی شد.

### ۵. استفاده از هوش مصنوعی در پروژه

در این تمرین، از ابزارهای هوش مصنوعی (AI) به عنوان یک **دستیار برنامه‌نویس (AI Assistant)** و نه به عنوان انجام‌دهنده کامل پروژه، استفاده شد. نحوه استفاده، مزایا و معایب آن در ادامه شرح داده می‌شود.

#### نحوه استفاده

*   **تولید کدهای تکراری (Boilerplate):** برای شروع سریع، از این ابزار برای تولید ساختار اولیه کامپوننت‌های React با `props` و `state` اولیه استفاده شد.
*   **رفع اشکال (Debugging):** در چند مورد با خطاهای غیرمنتظره مواجه شدم. برای مثال، خطای `The requested module does not provide an export named ...` که مربوط به نحوه `import` کردن `type`ها در TypeScript بود. با ارائه متن خطا به ابزار AI، به سرعت متوجه شدم که باید از `import type` به جای `import` خالی استفاده کنم.
*   **بررسی و ارائه راه‌حل‌های مختلف:** مهم‌ترین کمک این ابزار در مواجهه با "چالش مثلث" بود. من از آن خواستم تا روش‌های مختلف برای ساخت یک مثلث توخالی با CSS را به من نشان دهد. این کار به من کمک کرد تا مزایا و معایب هر روش (مانند `border` hack، `clip-path` و در نهایت SVG) را سریع‌تر درک کنم.
*   **بازنویسی و تمیزکاری کد (Refactoring):** پس از اتمام پروژه، از ابزار AI خواستم تا فایل `index.css` را با استفاده از متغیرهای CSS و گروه‌بندی بهتر، بازنویسی کند تا خواناتر و کوتاه‌تر شود.

#### مزایا

1.  **افزایش سرعت توسعه:** استفاده از `AI` به شکل چشمگیری در نوشتن کدهای روتین و رفع خطاهای رایج، سرعت کار را بالا برد.
2.  **ابزار یادگیری:** مواجهه با راه‌حل‌های مختلفی که این ابزار برای یک مسئله ارائه می‌دهد (مانند روش‌های مختلف ساخت مثلث)، به درک عمیق‌تر مفاهیم و پیدا کردن بهترین راه‌حل کمک می‌کند.
3.  **دستیار همیشه در دسترس:** داشتن یک دستیار برای پرسیدن سوالات سریع و دریافت بازخورد فوری، روند توسعه را بسیار روان‌تر می‌کند.

#### معایب و چالش‌ها

1.  **خطر ارائه راه‌حل‌های پیچیده یا اشتباه:** بزرگترین چالش من همین بود. در مورد مثلث، ابزار AI در ابتدا راه‌حل‌های مبتنی بر CSS را ارائه داد که پیچیده، دارای باگ و ناپایدار بودند. این نشان می‌دهد که AI همیشه بهترین یا ساده‌ترین راه را انتخاب نمی‌کند و نیاز به نظارت و قضاوت انسانی دارد.
2.  **نیاز به درک عمیق برای هدایت صحیح:** کیفیت خروجی ابزار `AI` به شدت به کیفیت ورودی (Prompt) بستگی دارد. اگر من به درستی مشکل "پرش مثلث" را توصیف نمی‌کردم، هرگز نمی‌توانست به راه حل SVG برسد. این یعنی کاربر باید خود دانش کافی برای هدایت ابزار را داشته باشد.
3.  **ریسک وابستگی و کاهش مهارت حل مسئله:** استفاده بیش از حد و بدون فکر از این ابزارها می‌تواند به یک عصا تبدیل شود و توانایی فرد در حل مسئله به صورت مستقل را تضعیف کند. ضروری است که از آن به عنوان یک "ابزار" و نه "جایگزین تفکر" استفاده شود.

### ۶. نتیجه‌گیری

این تمرین یک مرور بسیار مفید بر مفاهیم اساسی React مانند کامپوننت‌سازی، مدیریت وضعیت با `Context API` و مدیریت رویدادهای کاربر بود. چالش‌های فنی پروژه، به خصوص در بخش CSS، فرصت خوبی برای یادگیری عمیق‌تر و پیدا کردن راه‌حل‌های پایدار و بهینه فراهم کرد. همچنین، استفاده کنترل‌شده از هوش مصنوعی نشان داد که این ابزارها در صورت استفاده صحیح، می‌توانند به عنوان یک دستیار قدرتمند، بهره‌وری و کیفیت کد را افزایش دهند.

</div>
