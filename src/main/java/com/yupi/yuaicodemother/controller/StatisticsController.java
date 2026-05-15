package com.yupi.yuaicodemother.controller;

import com.mybatisflex.core.query.QueryWrapper;
import com.yupi.yuaicodemother.mapper.AppMapper;
import com.yupi.yuaicodemother.mapper.ChatHistoryMapper;
import com.yupi.yuaicodemother.mapper.UserMapper;
import com.yupi.yuaicodemother.pojo.entity.App;
import com.yupi.yuaicodemother.pojo.entity.ChatHistory;
import com.yupi.yuaicodemother.pojo.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final AppMapper appMapper;
    private final UserMapper userMapper;
    private final ChatHistoryMapper chatHistoryMapper;

    @GetMapping("/overview")
    public ResBody<Map<String, Object>> getOverview() {
        try {
            long totalApps = appMapper.selectCount(new QueryWrapper().where("isDelete = 0"));
            long activeUsers = userMapper.selectCount(new QueryWrapper().where("isDelete = 0"));
            long totalChats = chatHistoryMapper.selectCount(new QueryWrapper().where("isDelete = 0"));
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalApps", totalApps);
            stats.put("activeUsers", activeUsers);
            stats.put("totalChats", totalChats);
            stats.put("totalCodeLines", totalChats * 50);
            
            return ResBody.success(stats);
        } catch (Exception e) {
            return ResBody.error("获取统计数据失败：" + e.getMessage());
        }
    }
}
