export const props = {

    "Name" : {
        "Description": "Unique name for your VPC",
        "Required" : {
            "Required" : "Yes"
        },
        "Type": "text"
    },
    "CidrBlock": {
        "Description": "The IPv4 network range for the VPC, in CIDR notation. For example, 10.0.0.0/16. We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify it to 100.68.0.0/18.",
        "Required": {
            "Required": "Conditional",
            "Condition": "CidrBlock | Ipv4IpamPoolId"
        },

        "Type": "text",
        "Vars": "IP"
    },

    "EnableDNSHostnames": {
        "Description": "Indicates whether the instances launched in the VPC get DNS hostnames. If enabled, instances in the VPC get DNS hostnames; otherwise, they do not. Disabled by default for nondefault VPCs. You can only enable DNS hostnames if you've enabled DNS support.",
        "Required": {
            "Required": "No"
        },
        "Options": [
            "Yes",
            "No"
        ],
        "Type": "radio"
    },

    "EnableDnsSupport": {
        "Description": "Indicates whether the DNS resolution is supported for the VPC. If enabled, queries to the Amazon provided DNS server at the 169.254.169.253 IP address, or the reserved IP address at the base of the VPC network range 'plus two' succeed. If disabled, the Amazon provided DNS service in the VPC that resolves public DNS hostnames to IP addresses is not enabled. Enabled by default.",
        "Required": {
            "Required": "No"
        },
        "Options": [
            "Yes",
            "No"
        ],
        "Type": "radio"
    },

    "InstanceTenancy" : {
        "Description": "The allowed tenancy of instances launched into the VPC.\n\tdedicated: An instance launched into the VPC runs on dedicated hardware by default, unless you explicitly specify a tenancy of host during instance launch. You cannot specify a tenancy of default during instance launch.\n\tdefault: An instance launched into the VPC runs on shared hardware by default, unless you explicitly specify a different tenancy during instance launch.\n\thost",
        "Required" :{
            "Required": "No"
        },
        "Options" : [
            "dedicated",
            "default",
            "host"
        ],
        "Type": "radio"
    },
    "Ipv4IpamPoolId": {
        "Description": "The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR.",
        "Required": {
            "Required": "Conditional",
            "Condition": "CidrBlock | Ipv4IpamPoolId"
        },

        "Type": "text",
        "Vars": "IP"
    },
    "Ipv4NetmaskLength": {
        "Description": "The netmask length of the IPv4 CIDR you want to allocate to this VPC from an Amazon VPC IP Address Manager (IPAM) pool.",
        "Required" :{
            "Required": "No"
        },

        "Type": "number"
    }
}