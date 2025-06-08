package com.example.BloodDonationSystem_Backend.infra;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JpaUtil {

    //CLASS NÀY CHỊU TRÁCH NHIỆM KẾT NỐI CSDL THÔNG QUA ĐỐI TƯỢNG ENTITY_MANAGER_FACTORY, HAM RAM, PERFORMANCE, TỐN THỜI GIAN ĐỂ TẠO KÊNH KẾT NỐI VỚI SQL SERVER/MYSQL -> HEAVY CLASS
    //NÓ NÊN ĐƯỢC KHỞI TẠO SỚM, 1 LẦN, 1 INSTANCE, 1 VÙNG RAM, 1 OBJECT, SINGLETON
    //CHƯA KỂ MỖI LẦN NÓ ĐƯỢC TẠO RA, CÓ KHI NÓ SẼ TẠO MỚI TABLE LUÔN (OPTION CREATE), HOẶC NÓ SCAN LẠI CẤU TRÚC TABLE CÓ THAY ĐỔI GÌ KHÔNG ĐỂ CẬP NHẬT (OPTION UPDATE TRONG .XML)

    //KĨ THUẬT VIẾT CODE MÀ KHIẾN CHO CLASS KHÔNG NEW ĐƯỢC LẦN THỨ 2, KHÔNG ĐƯỢC NEW NHIỀU OBJECT, LỠ MAY GỌI NHỀU LẦN CÁI CLASS NÀY, CŨNG CHỈ CÓ 1 VÙNG NEW ĐƯỢC TẠO RA
    //STATIC + PRIVATE CONSTRUCTOR
    //1 CLASS KHÔNG CÓ CONSTRUCTOR -> JVM (JAVA VIRTUAL MACHINE) SẼ TẠO 1 CÁI CTOR RỖNG, VÂN  NEW OKIE LUÔN
    //CẤM TẠO OBJECT TỪ MỌI CONSTRUCTOR: CLASS KHÔNG CÓ CTOR, VÀ CTOR RỖNG MÌNH PHẾ LUÔN

    private static final EntityManagerFactory emf;
    //duy trì kết nối với CSDL, đọc file persistence.xml để tạo dựng/update table
    //heavy load nằm ở biến này!!!

    static {
        try{
            emf = Persistence.createEntityManagerFactory("com.phat.superapp-PU");  //load thông tin server từ file persistence.xml
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    //cấm new class này
    //biến emf Factory chỉ có 1 con đường được khởi tạo, khởi tạo 1 lần duy nhất qua đoạn lệnh trôi nổi static ở trên
    //KĨ THUẬT SINGLETON ĐÃ XONG - 1 OBJECT HEAVY ENTITY-MANAGER-FACTORY TRONG RAM
    private JpaUtil() {
    }

    //CÓ ÔNG NHÀ XƯỞNG FACTORY RỒI, ĐI MỜI CÁC ÔNG MANAGER VỀ QUẢN LÍ @ENTITY
    public static EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    //HÀM NÀY THÌ NHÓM REPOSITORY SẼ GỌI ĐẾN NHỜ VẢ XUỐNG TABLE
    //VÌ NÓ LÀ STATIC NÊN CHẤM XÀI LUÔN
    //JpaUtil.getEntityManager

    //ĐÓNG CỬA NHÀ MÁY, KHÔNG CẦN CHƠI VỚI CSDL NỮA, KHÔNG DUY TRÌ KẾT NỐI NỮA KHI APP SHUTDOWN
    public static void shutdowṇ() {
        emf.close();
    }
}
