package com.quyet.superapp.service;

import com.quyet.superapp.entity.Blog;
import com.quyet.superapp.entity.User;
import com.quyet.superapp.repository.BlogRepository;
import com.quyet.superapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public Blog getById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));
    }

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Blog save(Blog blog, Long authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tác giả với ID: " + authorId));
        blog.setAuthor(author);

        // Gán thời gian tạo nếu chưa có
        if (blog.getCreatedAt() == null) {
            blog.setCreatedAt(LocalDateTime.now());
        }

        return blogRepository.save(blog);
    }

    public void deleteById(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new IllegalArgumentException("Không tìm thấy blog để xóa với ID: " + id);
        }
        blogRepository.deleteById(id);
    }

    public long countActiveBlogs() {
        return blogRepository.countByStatus("Active");
    }
}
