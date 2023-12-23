package com.example.dto;
import com.example.entity.Message;
import com.example.entity.Server;

import java.util.List;

public class ChannelDTO {
    private Integer channelID;

    private String channelName;

    private Integer serverID;

    private List<Message> messages;
}
