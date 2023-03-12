export function formatRupiah(number: any) {
    let str = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
    return str.replace("Rp", "Rp.");
}
