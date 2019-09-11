export default class Product {
    id: number;
    slug?: string;
    ten_cay?: string;  
    hinh_anh_dai_dien?: string;
    danh_muc?: string;
    gia?: number;
    gia_khuyen_mai?: number;

    constructor(
        id: number,
        slug?: string,
        ten_cay?: string, 
        hinh_anh_dai_dien?: string,
        danh_muc?: string,
        gia?: number,
        gia_khuyen_mai?: number
    ) {
        this.id = id;
        this.slug = slug;
        this.ten_cay = ten_cay;
        this.hinh_anh_dai_dien = hinh_anh_dai_dien;
        this.danh_muc = danh_muc;
        this.gia = gia;
        this.gia_khuyen_mai = gia_khuyen_mai
    }
  }