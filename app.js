// app.js
document.addEventListener("DOMContentLoaded", function () {
  // Lấy danh sách danh mục từ localStorage hoặc tạo mới nếu chưa tồn tại
  let listCatalog = JSON.parse(localStorage.getItem("listCatalog")) || [];

  const addCatalogForm = document.getElementById("addCatalogForm");
  const searchCatalogForm = document.getElementById("searchCatalogForm");
  const catalogList = document.getElementById("catalogList");

  // Hiển thị danh sách danh mục sản phẩm
  function displayCatalogs(page) {
    const catalogsPerPage = 5;
    const startIndex = (page - 1) * catalogsPerPage;
    const endIndex = startIndex + catalogsPerPage;
    const paginatedCatalogs = listCatalog.slice(startIndex, endIndex);

    catalogList.innerHTML = "";

    paginatedCatalogs.forEach(function (catalog) {
      const row = document.createElement("div");
      row.innerHTML = `
        <p><strong>Mã danh mục:</strong> ${catalog.catalogId}</p>
        <p><strong>Tên danh mục:</strong> ${catalog.catalogName}</p>
        <p><strong>Độ ưu tiên:</strong> ${catalog.priority}</p>
        <p><strong>Mô tả:</strong> ${catalog.descriptions}</p>
        <p><strong>Trạng thái:</strong> ${catalog.status}</p>
        <button class="editBtn" data-catalogid="${catalog.catalogId}">Cập nhật</button>
        <button class="deleteBtn" data-catalogid="${catalog.catalogId}">Xóa</button>
      `;

      catalogList.appendChild(row);
      displayPagination(page);
    });
  }

  function displayPagination(currentPage) {
    const catalogsPerPage = 5;
    const totalPages = Math.ceil(listCatalog.length / catalogsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;

      if (i === currentPage) {
        pageButton.classList.add("active");
      }

      pageButton.addEventListener("click", function () {
        displayCatalogs(i);
      });

      pagination.appendChild(pageButton);
    }
  }

  // Lưu danh sách danh mục vào localStorage
  function saveCatalogs() {
    localStorage.setItem("listCatalog", JSON.stringify(listCatalog));
  }

  // Thêm mới danh mục sản phẩm
  addCatalogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const catalogId = document.getElementById("catalogId").value;
    const catalogName = document.getElementById("catalogName").value;
    const priority = document.getElementById("priority").value;
    const descriptions = document.getElementById("descriptions").value;
    const status = document.getElementById("status").value;

    const newCatalog = {
      catalogId: catalogId,
      catalogName: catalogName,
      priority: priority,
      descriptions: descriptions,
      status: status,
    };

    listCatalog.push(newCatalog);
    saveCatalogs();
    displayCatalogs(1);
    addCatalogForm.reset();
  });

  // Cập nhật danh mục sản phẩm
  catalogList.addEventListener("click", function (event) {
    if (event.target.classList.contains("editBtn")) {
      const catalogId = event.target.dataset.catalogid;

      const catalog = listCatalog.find(function (catalog) {
        return catalog.catalogId === catalogId;
      });

      if (catalog) {
        // Hiển thị form cập nhật với thông tin của danh mục
        document.getElementById("catalogId").value = catalog.catalogId;
        document.getElementById("catalogName").value = catalog.catalogName;
        document.getElementById("priority").value = catalog.priority;
        document.getElementById("descriptions").value = catalog.descriptions;
        document.getElementById("status").value = catalog.status;

        // Xóa danh mục cũ khỏi listCatalog
        listCatalog = listCatalog.filter(function (catalog) {
          return catalog.catalogId !== catalogId;
        });

        saveCatalogs();
        displayCatalogs(1);
      }
    }
  });

  // Xóa danh mục sản phẩm
  catalogList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
      const catalogId = event.target.dataset.catalogid;

      listCatalog = listCatalog.filter(function (catalog) {
        return catalog.catalogId !== catalogId;
      });

      saveCatalogs();
      displayCatalogs(1);
    }
  });

  // Tìm kiếm danh mục sản phẩm
  searchCatalogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchName = document
      .getElementById("searchName")
      .value.toLowerCase();

    const filteredCatalogs = listCatalog.filter(function (catalog) {
      return catalog.catalogName.toLowerCase().includes(searchName);
    });

    catalogList.innerHTML = "";

    filteredCatalogs.forEach(function (catalog) {
      const row = document.createElement("div");
      row.innerHTML = `
        <p><strong>Mã danh mục:</strong> ${catalog.catalogId}</p>
        <p><strong>Tên danh mục:</strong> ${catalog.catalogName}</p>
        <p><strong>Độ ưu tiên:</strong> ${catalog.priority}</p>
        <p><strong>Mô tả:</strong> ${catalog.descriptions}</p>
        <p><strong>Trạng thái:</strong> ${catalog.status}</p>
        <button class="editBtn" data-catalogid="${catalog.catalogId}">Cập nhật</button>
        <button class="deleteBtn" data-catalogid="${catalog.catalogId}">Xóa</button>
      `;

      catalogList.appendChild(row);
    });
  });

  // Phân trang dữ liệu hiển thị
  displayCatalogs(1);
});
