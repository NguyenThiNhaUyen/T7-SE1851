package com.example.BloodDonationSystem_Backend.repository;

import com.example.BloodDonationSystem_Backend.entity.User;
import com.example.BloodDonationSystem_Backend.infra.JpaUtil;
import jakarta.persistence.EntityManager;

public class UserRepo {

    //CLASS NÀY CHỨA CÁC HÀM CRUD TRỰC TIẾP TABLE STUDENT - REPO: NHÀ KHO DỮ LIỆU
    //MUỐN CRUD TABLE THÌ PHẢI NHỜ VẢ ÔNG ENTITY-MANAGER ĐƯỢC CUNG CẤP TỪ JpaUtil SINGLETON
    //FLOW: UI ... SERVICE ... REPO (ĐÂY) --- JPAUTIL (ENTITY-MANAGER VÀ FACTORY) ... TABLE

    //CÁC HÀM CRUD Ở ĐÂY ĐẶT TÊN NGẮN GỌN, HƯỚNG HÀNH ĐỘNG GIỐNG NHƯ LỆNH SQL CHUẨN (INSERT, UPDATE, DELETE)
    //TÊN HÀM GỢI Ý: save() update() delete() remove() find() findAll() findById()
    //TÙY HÀM, NHƯNG NẾU CÓ THAY ĐỔI TRONG TABLE (INSERT, UPDATE, DELETE) THÌ
    //HÀM SẼ NHẬN VÀO OBJECT (INSERT, UPDATE), HOẶC KEY (DELETE) DELETE ĐƯA OBJECT VẪN ĐƯỢC VÌ VÀO TRONG OBJECT, GET FIELD KEY ĐỂ XÓA
    //NHỚ DÙNG TRANSACTION KHI THAY ĐỔI DATA TRONG TABLE (INSERT, UPDATE, DELETE)
    //SELECT KHÔNG CẦN, VÌ KHÔNG THAY ĐỔI TABLE

    //HÀM INSERT XUỐNG TABLE
//    public void save(Student obj) {
//        //gọi EM (Entity Manager) nhờ giúp, kèm transaction - có thay đổi data
//        EntityManager em = JpaUtil.getEntityManager();  //đoạn lệnh trôi nổi static {}
//        //chạy duy nhất 1 lần, khởi chạy heavy connection
//        em.getTransaction().begin();
//        em.persist(obj);
//        em.getTransaction().commit();
//        //try catch khi save bị lỗi - từ từ...
//        em.close(); //giám đốc xong việc!!!
//    }

//    //HÀM LẤY TẤT CẢ SINH VIÊN - JPQL SELECT s FROM Student s
//    public List<Student> findAll() {
//        EntityManager em = JpaUtil.getEntityManager();
//        return em.createQuery("FROM Student", Student.class).getResultList();
//    }

//    //SỬA THÔNG TIN SINH VIÊN - CẬP NHẬT
//    public void update(Student obj) {
//        EntityManager em = JpaUtil.getEntityManager();
//        em.getTransaction().begin();
//        em.merge(obj);      //merge() nghĩa là tích hợp object đưa vào trong EM
//        //EM nó sẽ đổ ngang, copy ngang obj vào TRONG obj ứng với dòng trong table
//        //nếu bạn cố tình đưa object mà key không tồn tại trong table, sẽ insert mới
//        em.getTransaction().commit();
//    }


//    public void delete(Student obj) {
//        EntityManager em = JpaUtil.getEntityManager();
//        em.getTransaction().begin();
//        em.merge(obj);
//        em.getTransaction().commit();
//    }
//
//    //OVERLOAD
//    public void delete(String id) {
//        EntityManager em = JpaUtil.getEntityManager();
//        em.getTransaction().begin();
//
//        Student x = em.find(Student.class, id); //tìm ku sv có id = id đưa vào, gọi là x
//        //và remove x, remove obj giống như trên
//        em.remove(x);
//        //em.remove(em.find(Student.class, id));    //VIẾT GỘP
//
//        em.getTransaction().commit();
//    }
//
//    //TODO AT HOME: LÀM THÊM HÀM WHERE THEO CỘT NÀO ĐÓ, findById() TRẢ VỀ 1 LIST
//   public Student findById(String id) {
    ////        EntityManager em = JpaUtil.getEntityManager();
    ////        return em.find(Student.class, id);
    ////    }
//
//    public List<Student> findById(String id) {
//        EntityManager em = JpaUtil.getEntityManager();
//        return em.createQuery("FROM Student s WHERE s.id = :id", Student.class).setParameter("id", id).getResultList();
//    }

//    public void save(User obj) {
//        //gọi EM (Entity Manager) nhờ giúp, kèm transaction - có thay đổi data
//        EntityManager em = JpaUtil.getEntityManager();  //đoạn lệnh trôi nổi static {}
//        //chạy duy nhất 1 lần, khởi chạy heavy connection
//        em.getTransaction().begin();
//        em.persist(obj);
//        em.getTransaction().commit();
//        //try catch khi save bị lỗi - từ từ...
//        em.close(); //giám đốc xong việc!!!
//    }
}
