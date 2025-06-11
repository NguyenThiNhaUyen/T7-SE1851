package com.quyet.superapp.service;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Blog save(Blog blog) {
        return blogRepository.save(blog);
    }
}
