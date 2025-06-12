    package com.quyet.superapp.entity;

    import jakarta.persistence.*;
    import lombok.*;
    import java.util.List;

    @Entity
    @Table(name = "Users")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class User {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "User_Id")
        private Long user_id;

        @Column(name = "UserName", columnDefinition = "NVARCHAR(100)", nullable = false)
        private String username;

        @Column(name = "Password", columnDefinition = "VARCHAR(255)", nullable = false)
        private String password; // đủ dài cho BCrypt nếu sau này dùng

        @Column(name = "IsEnable")
        private boolean isEnable;

        @ManyToOne(fetch = FetchType.LAZY) // mặc định sẽ load role luôn khi truy vấn user
        @JoinColumn(name = "Role_Id") //Khóa ngoại của bảng Users
        private Role role;


    @Column(name = "Email", columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String email;


    @OneToOne(mappedBy = "user",     cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    }, fetch = FetchType.LAZY, orphanRemoval = true)
    private UserDetail userDetail;

    @OneToOne(mappedBy = "user", cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    }, fetch = FetchType.LAZY, orphanRemoval = true)
    private UserProfile userProfile;

}


