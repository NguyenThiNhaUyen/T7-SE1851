package com.quyet.superapp.mapper;

import com.quyet.superapp.dto.BlogDto;
import com.quyet.superapp.entity.Blog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlogMapper {

    @Mapping(source = "author.id", target = "authorId")
    BlogDto toDto(Blog blog);

    @Mapping(source = "authorId", target = "author.id")
    Blog toEntity(BlogDto dto);
}
