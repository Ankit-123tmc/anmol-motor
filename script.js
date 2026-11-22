// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Anmol Motor - Spare Parts</title>
// <style>
// *{box-sizing:border-box}
// body{margin:0;font-family:Arial,sans-serif;background:#f5f6f8;color:#222}
// header{background:#111827;color:white;padding:20px}
// .header-inner{max-width:1200px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:20px}
// header h1{margin:0;font-size:25px}
// .cart-btn{border:0;border-radius:9px;padding:11px 17px;background:#fff;color:#111827;font-weight:700;cursor:pointer}
// main{max-width:1200px;margin:25px auto;padding:0 16px}
// .search-row{display:flex;gap:10px;margin-bottom:20px}
// .search-row input{flex:1;padding:13px;border:1px solid #ccc;border-radius:9px;font-size:16px}
// .search-row button{padding:13px 18px;border:0;border-radius:9px;background:#111827;color:white;cursor:pointer}
// #resultCount{margin-bottom:15px;color:#666}
// #products-container{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
// .product{background:white;border-radius:14px;padding:16px;box-shadow:0 3px 15px rgba(0,0,0,.08)}
// .product-image{width:100%;height:180px;object-fit:contain;background:#fafafa;border-radius:10px}
// .product h3{font-size:18px;margin:13px 0 9px}
// .product p{margin:7px 0;font-size:14px}
// .mrp{text-decoration:line-through;color:#777}
// .discount{color:#d11;font-weight:700}
// .price{font-size:17px}
// .enquire-button{width:100%;margin-top:12px;padding:12px;border:0;border-radius:9px;background:#111827;color:#fff;font-weight:700;cursor:pointer}
// .enquire-button:hover,.cart-btn:hover{opacity:.9}
// #showMore{display:block;margin:25px auto;padding:12px 20px;border:0;border-radius:9px;cursor:pointer}
// .hidden{display:none!important}

// .overlay{position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}
// .panel{width:min(760px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:16px;padding:24px;position:relative}
// .close{position:absolute;right:15px;top:10px;border:0;background:none;font-size:30px;cursor:pointer}
// .panel h2{margin-top:0}
// .order-item{display:flex;gap:15px;align-items:center;padding:13px 0;border-bottom:1px solid #eee}
// .order-item img{width:80px;height:70px;object-fit:contain;background:#f7f7f7;border-radius:8px}
// .order-info{flex:1}
// .qty{display:flex;align-items:center;gap:8px}
// .qty button{width:30px;height:30px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer}
// .remove{border:0;background:#fee2e2;color:#b91c1c;padding:7px;border-radius:6px;cursor:pointer}
// .total{display:flex;justify-content:space-between;font-size:20px;font-weight:700;margin:20px 0}
// .primary{width:100%;padding:13px;border:0;border-radius:9px;background:#111827;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
// .secondary{padding:10px 14px;border:1px solid #ccc;background:#fff;border-radius:8px;cursor:pointer}
// .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
// .form-group{display:flex;flex-direction:column;gap:6px}
// .form-group.full{grid-column:1/-1}
// .form-group input,.form-group textarea{padding:11px;border:1px solid #ccc;border-radius:8px;font:inherit}
// .summary{background:#f7f7f7;border-radius:10px;padding:15px;margin:15px 0}
// .summary-row{display:flex;justify-content:space-between;gap:20px;padding:6px 0}
// .confirm{border:1px solid #ddd;border-radius:10px;padding:12px;margin-bottom:10px}
// .success{text-align:center;padding:25px}
// .success h2{color:#16803c}
// @media(max-width:650px){.form-grid{grid-template-columns:1fr}.form-group.full{grid-column:auto}.header-inner{align-items:flex-start}.order-item{align-items:flex-start}}
// </style>
// </head>
// <body>

// <header>
//   <div class="header-inner">
//     <h1>Anmol Motor</h1>
//     <button class="cart-btn" id="orderButton">Order (<span id="cartCount">0</span>)</button>
//   </div>
// </header>

// <main>
//   <div class="search-row">
//     <input id="searchPart" type="search" placeholder="Search part number, part name, vehicle or manufacturer">
//     <button id="searchButton">Search</button>
//   </div>
//   <div id="resultCount"></div>
//   <div id="products-container"></div>
//   <button id="showMore">Show More</button>
// </main>

// <div id="modalRoot"></div>

// <script>
// /* Your existing product data should remain here.
//    This demo data is included so the downloaded site works immediately.
//    Replace/add your complete allProducts array below with your existing data. */
// const allProducts = [
//   {
//     partNumber:"MVSR13204",
//     name:"RACK SCORPIO S SER WITH TRE",
//     mrp:18000,
//     manufacturer:"MAHINDRA",
//     application:"SCORPIO S SER"
//   },
//   {
//     partNumber:"MVSR13306",
//     name:"RACK TIAGO WITH TRE",
//     mrp:8000,
//     manufacturer:"TATA",
//     application:"TIAGO"
//   }
// ];

// let filteredProducts = allProducts.slice();
// let visibleCount = 30;
// let order = [];

// const container=document.getElementById("products-container");
// const searchInput=document.getElementById("searchPart");
// const resultCount=document.getElementById("resultCount");
// const showMore=document.getElementById("showMore");
// const cartCount=document.getElementById("cartCount");
// const modalRoot=document.getElementById("modalRoot");

// function valueOf(p,keys){
//   for(const k of keys){
//     if(p[k]!==undefined && p[k]!==null && String(p[k]).trim()!=="") return String(p[k]);
//   }
//   return "";
// }
// function partName(p){return valueOf(p,["name","partName","part_name","application"])}
// function partNumber(p){return valueOf(p,["partNumber","part_number","mvNumber","mv_number","mv"])}
// function application(p){return valueOf(p,["vehicle","application","model"])}
// function manufacturer(p){return valueOf(p,["manufacturer","brand"])}
// function mrp(p){return Number(p.mrp)||0}
// function money(v){return "₹"+Number(v||0).toLocaleString("en-IN")}
// function partImage(p){
//   const n=partName(p).toLowerCase();
//   if(n.includes("tie rod end")) return "images/tie-rod-end.png";
//   if(n.includes("rack end")) return "images/rack-end.png";
//   if(n.includes("stabilizer link")) return "images/stabilizer-link.png";
//   if(n.includes("ball joint")) return "images/ball-joint.png";
//   if(n.includes("lower arm")) return "images/lower-arm.png";
//   return "images/no-image.png.svg";
// }
// function clean(v){
//   return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
// }
// function discounted(p){return Math.round(mrp(p)*.60)}

// function render(){
//   const items=filteredProducts.slice(0,visibleCount);
//   resultCount.textContent=`${filteredProducts.length} matching part${filteredProducts.length===1?"":"s"}`;
//   container.innerHTML=items.length?items.map((p,index)=>`
//     <article class="product">
//       <img class="product-image" src="${partImage(p)}" alt="${clean(partName(p)||"Spare Part")}">
//       <h3>${clean(partName(p)||"Spare Part")}</h3>
//       <p><strong>Part No:</strong> ${clean(partNumber(p)||"Not available")}</p>
//       <p><strong>Vehicle/Application:</strong> ${clean(application(p)||"Not specified")}</p>
//       <p><strong>Manufacturer:</strong> ${clean(manufacturer(p)||"Not specified")}</p>
//       <p class="mrp"><strong>MRP: ${money(mrp(p))}</strong></p>
//       <p class="discount"><strong>40% OFF</strong></p>
//       <p class="price"><strong>Rate: ${money(discounted(p))}</strong></p>
//       <button class="enquire-button" data-index="${index}">Add to Order</button>
//     </article>
//   `).join(""):`<div class="product"><h3>No spare part found</h3><p>Try another search.</p></div>`;

//   document.querySelectorAll(".enquire-button").forEach(btn=>{
//     btn.onclick=()=>{
//       const p=items[Number(btn.dataset.index)];
//       addToOrder(p);
//     };
//   });
//   showMore.style.display=visibleCount<filteredProducts.length?"block":"none";
// }

// function addToOrder(product){
//   const key=partNumber(product)||partName(product);
//   const existing=order.find(x=>x.key===key);
//   if(existing) existing.qty++;
//   else order.push({key,product,qty:1});
//   updateCart();
//   openOrder();
// }

// function updateCart(){
//   cartCount.textContent=order.reduce((sum,x)=>sum+x.qty,0);
// }

// function closeModal(){modalRoot.innerHTML=""}

// function openOrder(){
//   modalRoot.innerHTML=`
//     <div class="overlay">
//       <div class="panel">
//         <button class="close" onclick="closeModal()">&times;</button>
//         <h2>Your Order</h2>
//         <div id="orderList"></div>
//         <div class="total"><span>Total</span><span id="orderTotal">₹0</span></div>
//         <button class="primary" id="detailsBtn">Proceed to Details</button>
//       </div>
//     </div>`;
//   renderOrder();
// }

// function renderOrder(){
//   const list=document.getElementById("orderList");
//   if(!list) return;
//   if(!order.length){
//     list.innerHTML="<p>Your order is empty.</p>";
//     document.getElementById("detailsBtn").disabled=true;
//     return;
//   }
//   list.innerHTML=order.map((item,i)=>`
//     <div class="order-item">
//       <img src="${partImage(item.product)}" alt="">
//       <div class="order-info">
//         <strong>${clean(partName(item.product))}</strong>
//         <div>Part No: ${clean(partNumber(item.product))}</div>
//         <div>Rate: ${money(discounted(item.product))}</div>
//       </div>
//       <div class="qty">
//         <button onclick="changeQty(${i},-1)">−</button>
//         <strong>${item.qty}</strong>
//         <button onclick="changeQty(${i},1)">+</button>
//       </div>
//       <button class="remove" onclick="removeItem(${i})">Remove</button>
//     </div>
//   `).join("");
//   document.getElementById("orderTotal").textContent=money(getTotal());
//   document.getElementById("detailsBtn").onclick=openDetails;
// }

// function changeQty(i,delta){
//   order[i].qty+=delta;
//   if(order[i].qty<=0) order.splice(i,1);
//   updateCart(); renderOrder();
// }
// function removeItem(i){order.splice(i,1);updateCart();renderOrder()}
// function getTotal(){return order.reduce((sum,x)=>sum+discounted(x.product)*x.qty,0)}

// function openDetails(){
//   if(!order.length)return;
//   modalRoot.innerHTML=`
//     <div class="overlay">
//       <div class="panel">
//         <button class="close" onclick="openOrder()">&times;</button>
//         <h2>Customer Details</h2>
//         <form id="detailsForm">
//           <div class="form-grid">
//             <div class="form-group">
//               <label>Name *</label>
//               <input id="custName" required placeholder="Your name">
//             </div>
//             <div class="form-group">
//               <label>Phone *</label>
//               <input id="custPhone" required maxlength="10" pattern="[0-9]{10}" placeholder="10 digit phone number">
//             </div>
//             <div class="form-group full">
//               <label>Address *</label>
//               <textarea id="custAddress" rows="3" required placeholder="Delivery address"></textarea>
//             </div>
//             <div class="form-group">
//               <label>City *</label>
//               <input id="custCity" required>
//             </div>
//             <div class="form-group">
//               <label>State *</label>
//               <input id="custState" required>
//             </div>
//             <div class="form-group">
//               <label>Pincode *</label>
//               <input id="custPincode" required maxlength="6" pattern="[0-9]{6}">
//             </div>
//           </div>
//           <button class="primary" type="submit" style="margin-top:18px">Review Order</button>
//         </form>
//       </div>
//     </div>`;
//   document.getElementById("detailsForm").onsubmit=e=>{
//     e.preventDefault();
//     const phone=document.getElementById("custPhone").value.trim();
//     const pin=document.getElementById("custPincode").value.trim();
//     if(!/^[0-9]{10}$/.test(phone)){alert("Enter a valid 10 digit phone number.");return}
//     if(!/^[0-9]{6}$/.test(pin)){alert("Enter a valid 6 digit pincode.");return}
//     openReview({
//       name:document.getElementById("custName").value.trim(),
//       phone,address:document.getElementById("custAddress").value.trim(),
//       city:document.getElementById("custCity").value.trim(),
//       state:document.getElementById("custState").value.trim(),
//       pincode:pin
//     });
//   };
// }

// function openReview(customer){
//   window.currentCustomer=customer;
//   modalRoot.innerHTML=`
//     <div class="overlay">
//       <div class="panel">
//         <button class="close" onclick="openDetails()">&times;</button>
//         <h2>Review Your Order</h2>
//         <div class="summary">
//           ${order.map(x=>`
//             <div class="summary-row">
//               <span>${clean(partName(x.product))} × ${x.qty}</span>
//               <strong>${money(discounted(x.product)*x.qty)}</strong>
//             </div>`).join("")}
//           <hr>
//           <div class="summary-row"><strong>Total</strong><strong>${money(getTotal())}</strong></div>
//         </div>
//         <div class="confirm">
//           <strong>Customer</strong><br>
//           ${clean(customer.name)}<br>
//           ${clean(customer.phone)}
//         </div>
//         <div class="confirm">
//           <strong>Delivery Address</strong><br>
//           ${clean(customer.address)}<br>
//           ${clean(customer.city)}, ${clean(customer.state)} - ${clean(customer.pincode)}
//         </div>
//         <button class="primary" onclick="placeOrder()">Place Order</button>
//       </div>
//     </div>`;
// }

// function placeOrder(){
//   const orderNumber="AM"+Date.now().toString().slice(-8);
//   const customer=window.currentCustomer;
//   const saved={
//     orderNumber,
//     date:new Date().toLocaleString("en-IN"),
//     customer,
//     items:order.map(x=>({
//       partName:partName(x.product),
//       partNumber:partNumber(x.product),
//       quantity:x.qty,
//       rate:discounted(x.product),
//       amount:discounted(x.product)*x.qty
//     })),
//     total:getTotal()
//   };
//   const existing=JSON.parse(localStorage.getItem("anmolMotorOrders")||"[]");
//   existing.push(saved);
//   localStorage.setItem("anmolMotorOrders",JSON.stringify(existing));

//   modalRoot.innerHTML=`
//     <div class="overlay">
//       <div class="panel success">
//         <h2>Order Placed Successfully</h2>
//         <p>Your order has been recorded on this device.</p>
//         <p><strong>Order No: ${orderNumber}</strong></p>
//         <p>Total: <strong>${money(saved.total)}</strong></p>
//         <button class="primary" onclick="closeModal()">Continue Shopping</button>
//       </div>
//     </div>`;
//   order=[];
//   updateCart();
// }

// document.getElementById("orderButton").onclick=openOrder;
// document.getElementById("searchButton").onclick=()=>search(searchInput.value);
// searchInput.addEventListener("input",()=>search(searchInput.value));
// showMore.onclick=()=>{visibleCount+=30;render()};

// function search(text){
//   const q=text.trim().toLowerCase();
//   filteredProducts=q?allProducts.filter(p=>[
//     partNumber(p),partName(p),application(p),manufacturer(p)
//   ].some(v=>v.toLowerCase().includes(q))):allProducts.slice();
//   visibleCount=30;render();
// }

// render();
// </script>
// </body>
// </html>
